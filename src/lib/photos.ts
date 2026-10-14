import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { del, list, put } from "@vercel/blob";
import { locales } from "@/i18n/config";

export type PhotoStorage = "static" | "local" | "blob";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  altEn?: string;
  createdAt: string;
  storage: PhotoStorage;
  blobPathname?: string;
};

const DATA_FILE = path.join(process.cwd(), "data", "photos.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "gallery");
const MANIFEST_PREFIX = "gallery/manifest";
const BLOB_UPLOAD_PREFIX = "gallery/uploads";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function usesBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureUploadDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function readLocalManifest(): Promise<GalleryPhoto[]> {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw) as GalleryPhoto[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeLocalManifest(photos: GalleryPhoto[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(photos, null, 2)}\n`, "utf8");
}

async function readBlobManifest(): Promise<GalleryPhoto[] | null> {
  const { blobs } = await list({
    prefix: MANIFEST_PREFIX,
    limit: 20,
  });

  if (!blobs.length) return null;

  const latest = [...blobs].sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  )[0];

  const response = await fetch(latest.url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Αποτυχία ανάγνωσης manifest από Blob.");
  }

  const parsed = (await response.json()) as GalleryPhoto[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeBlobManifest(photos: GalleryPhoto[]) {
  await put(`${MANIFEST_PREFIX}/photos.json`, JSON.stringify(photos, null, 2), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
    allowOverwrite: false,
  });
}

function revalidateGalleryPaths() {
  revalidatePath("/admin");
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
  }
}

export async function getPhotos(): Promise<GalleryPhoto[]> {
  noStore();

  if (usesBlobStorage()) {
    try {
      const fromBlob = await readBlobManifest();
      if (fromBlob) return fromBlob;
    } catch {
      // Fall through to local seed when blob is empty/unavailable.
    }
  }

  return readLocalManifest();
}

export async function savePhotos(photos: GalleryPhoto[]): Promise<void> {
  if (usesBlobStorage()) {
    await writeBlobManifest(photos);
    // Keep local seed in sync during development.
    if (process.env.NODE_ENV !== "production") {
      await writeLocalManifest(photos);
    }
  } else {
    await writeLocalManifest(photos);
  }

  revalidateGalleryPaths();
}

function sanitizeAlt(value: unknown, fallback = "Φωτογραφία έργου"): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim().slice(0, 180);
  return trimmed || fallback;
}

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_MIME.has(file.type)) {
    return "Επιτρέπονται μόνο JPEG, PNG, WebP και GIF.";
  }
  if (file.size <= 0) return "Το αρχείο είναι κενό.";
  if (file.size > 8 * 1024 * 1024) {
    return "Το μέγιστο μέγεθος αρχείου είναι 8MB.";
  }
  return null;
}

async function persistUpload(
  file: File,
): Promise<{ src: string; storage: PhotoStorage; blobPathname?: string }> {
  const ext = EXT_BY_MIME[file.type] ?? "jpg";
  const id = randomUUID();
  const bytes = Buffer.from(await file.arrayBuffer());

  if (usesBlobStorage()) {
    const blob = await put(`${BLOB_UPLOAD_PREFIX}/${id}.${ext}`, bytes, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });
    return {
      src: blob.url,
      storage: "blob",
      blobPathname: blob.pathname,
    };
  }

  await ensureUploadDir();
  const filename = `${id}.${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, filename), bytes);
  return {
    src: `/uploads/gallery/${filename}`,
    storage: "local",
  };
}

export async function addPhoto(input: {
  file: File;
  alt?: string;
  altEn?: string;
}): Promise<GalleryPhoto> {
  const validationError = validateImageFile(input.file);
  if (validationError) {
    throw new Error(validationError);
  }

  if (!usesBlobStorage() && process.env.VERCEL) {
    throw new Error(
      "Για ανεβάσματα στο Vercel χρειάζεται BLOB_READ_WRITE_TOKEN.",
    );
  }

  const uploaded = await persistUpload(input.file);
  const photo: GalleryPhoto = {
    id: randomUUID(),
    src: uploaded.src,
    alt: sanitizeAlt(input.alt),
    altEn: input.altEn ? sanitizeAlt(input.altEn, "") : undefined,
    createdAt: new Date().toISOString(),
    storage: uploaded.storage,
    blobPathname: uploaded.blobPathname,
  };

  const photos = await getPhotos();
  photos.unshift(photo);
  await savePhotos(photos);
  return photo;
}

export async function updatePhoto(
  id: string,
  patch: { alt?: string; altEn?: string },
): Promise<GalleryPhoto> {
  const photos = await getPhotos();
  const index = photos.findIndex((photo) => photo.id === id);
  if (index < 0) throw new Error("Η φωτογραφία δεν βρέθηκε.");

  const current = photos[index];
  const next: GalleryPhoto = {
    ...current,
    alt:
      patch.alt !== undefined ? sanitizeAlt(patch.alt, current.alt) : current.alt,
    altEn:
      patch.altEn !== undefined
        ? sanitizeAlt(patch.altEn, current.altEn ?? "")
        : current.altEn,
  };

  photos[index] = next;
  await savePhotos(photos);
  return next;
}

export async function deletePhoto(id: string): Promise<void> {
  const photos = await getPhotos();
  const target = photos.find((photo) => photo.id === id);
  if (!target) throw new Error("Η φωτογραφία δεν βρέθηκε.");

  if (target.storage === "static") {
    // Keep bundled assets; only remove from the gallery list.
  } else if (target.storage === "blob" && target.blobPathname) {
    await del(target.blobPathname);
  } else if (target.storage === "local" && target.src.startsWith("/uploads/")) {
    const absolute = path.join(process.cwd(), "public", target.src);
    await fs.unlink(absolute).catch(() => undefined);
  }

  await savePhotos(photos.filter((photo) => photo.id !== id));
}

export async function reorderPhotos(orderedIds: string[]): Promise<GalleryPhoto[]> {
  const photos = await getPhotos();
  const byId = new Map(photos.map((photo) => [photo.id, photo]));
  const next: GalleryPhoto[] = [];

  for (const id of orderedIds) {
    const photo = byId.get(id);
    if (photo) {
      next.push(photo);
      byId.delete(id);
    }
  }

  // Append any leftovers to avoid accidental data loss.
  for (const photo of byId.values()) {
    next.push(photo);
  }

  await savePhotos(next);
  return next;
}

export function photoAltForLocale(
  photo: GalleryPhoto,
  locale: string,
  fallback: string,
): string {
  if (locale === "el") return photo.alt || fallback;
  return photo.altEn || photo.alt || fallback;
}
