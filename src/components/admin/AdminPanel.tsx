"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type { GalleryPhoto } from "@/lib/photos";

type AdminPanelProps = {
  initialAuthenticated: boolean;
  configured: boolean;
  blobEnabled: boolean;
  initialPhotos: GalleryPhoto[];
};

export default function AdminPanel({
  initialAuthenticated,
  configured,
  blobEnabled,
  initialPhotos,
}: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [photos, setPhotos] = useState(initialPhotos);
  const [password, setPassword] = useState("");
  const [alt, setAlt] = useState("");
  const [altEn, setAltEn] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadPhotos() {
    const response = await fetch("/api/admin/photos", { cache: "no-store" });
    if (!response.ok) {
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error ?? "Αποτυχία φόρτωσης φωτογραφιών.");
    }
    const data = (await response.json()) as { photos: GalleryPhoto[] };
    setPhotos(data.photos);
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(data.error ?? "Αποτυχία σύνδεσης.");
      return;
    }

    setPassword("");
    setAuthenticated(true);
    setNotice("Συνδεθήκατε με επιτυχία.");
    startTransition(() => {
      void loadPhotos().catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Σφάλμα φόρτωσης.");
      });
    });
  }

  async function handleLogout() {
    setError(null);
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setNotice("Αποσυνδεθήκατε.");
  }

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files);
    if (!list.length) return;

    setUploading(true);
    setError(null);
    setNotice(null);

    try {
      for (const file of list) {
        const form = new FormData();
        form.set("file", file);
        if (alt.trim()) form.set("alt", alt.trim());
        if (altEn.trim()) form.set("altEn", altEn.trim());

        const response = await fetch("/api/admin/photos", {
          method: "POST",
          body: form,
        });
        const data = (await response.json()) as {
          error?: string;
          photo?: GalleryPhoto;
        };

        if (!response.ok || !data.photo) {
          throw new Error(data.error ?? `Αποτυχία ανεβάσματος: ${file.name}`);
        }

        setPhotos((current) => [data.photo!, ...current]);
      }

      setAlt("");
      setAltEn("");
      setNotice(
        list.length === 1
          ? "Η φωτογραφία ανέβηκε."
          : `Ανέβηκαν ${list.length} φωτογραφίες.`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Αποτυχία ανεβάσματος.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function saveAlt(photo: GalleryPhoto, nextAlt: string, nextAltEn: string) {
    setBusyId(photo.id);
    setError(null);
    try {
      const response = await fetch(`/api/admin/photos/${photo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt: nextAlt, altEn: nextAltEn }),
      });
      const data = (await response.json()) as {
        error?: string;
        photo?: GalleryPhoto;
      };
      if (!response.ok || !data.photo) {
        throw new Error(data.error ?? "Αποτυχία αποθήκευσης.");
      }
      setPhotos((current) =>
        current.map((item) => (item.id === photo.id ? data.photo! : item)),
      );
      setNotice("Το κείμενο εναλλακτικής ενημερώθηκε.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Αποτυχία αποθήκευσης.");
    } finally {
      setBusyId(null);
    }
  }

  async function removePhoto(id: string) {
    if (!window.confirm("Να διαγραφεί η φωτογραφία από τη συλλογή;")) return;

    setBusyId(id);
    setError(null);
    try {
      const response = await fetch(`/api/admin/photos/${id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Αποτυχία διαγραφής.");
      }
      setPhotos((current) => current.filter((photo) => photo.id !== id));
      setNotice("Η φωτογραφία αφαιρέθηκε.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Αποτυχία διαγραφής.");
    } finally {
      setBusyId(null);
    }
  }

  async function movePhoto(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;

    const next = [...photos];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    setPhotos(next);

    setBusyId(item.id);
    setError(null);
    try {
      const response = await fetch("/api/admin/photos/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: next.map((photo) => photo.id) }),
      });
      const data = (await response.json()) as {
        error?: string;
        photos?: GalleryPhoto[];
      };
      if (!response.ok || !data.photos) {
        throw new Error(data.error ?? "Αποτυχία αναδιάταξης.");
      }
      setPhotos(data.photos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Αποτυχία αναδιάταξης.");
      await loadPhotos().catch(() => undefined);
    } finally {
      setBusyId(null);
    }
  }

  if (!configured) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl items-center px-5 py-16">
        <div className="w-full rounded-[1.5rem] border border-beige-soft bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold tracking-[0.14em] text-green-natural uppercase">
            Admin
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-green-deep">
            Ρύθμιση κωδικού
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            Ορίστε τη μεταβλητή περιβάλλοντος{" "}
            <code className="rounded bg-green-mist px-1.5 py-0.5 text-sm text-green-deep">
              ADMIN_PASSWORD
            </code>{" "}
            στο <code className="text-sm">.env.local</code> ή στο Vercel και
            επανεκκινήστε την εφαρμογή.
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="relative mx-auto flex min-h-screen max-w-md items-center px-5 py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 10%, rgba(116,198,157,0.28), transparent 45%), radial-gradient(ellipse at 80% 90%, rgba(201,184,150,0.22), transparent 40%)",
          }}
          aria-hidden
        />
        <form
          onSubmit={handleLogin}
          className="relative w-full rounded-[1.5rem] border border-beige-soft bg-white/95 p-8 shadow-[var(--shadow-soft)] backdrop-blur"
        >
          <p className="text-sm font-semibold tracking-[0.14em] text-green-natural uppercase">
            Κώστας Γάλλος
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-green-deep">
            Διαχείριση φωτογραφιών
          </h1>
          <p className="mt-3 text-sm text-muted">
            Συνδεθείτε για να ανεβάσετε, να διαγράψετε ή να αλλάξετε σειρά στις
            φωτογραφίες έργων.
          </p>

          <label className="mt-8 block text-sm font-medium text-green-deep">
            Κωδικός πρόσβασης
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-beige-soft bg-off-white px-4 py-3 text-ink outline-none ring-green-soft focus:ring-2"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-green-deep px-4 py-3 font-semibold text-white transition hover:bg-green-dark"
          >
            Σύνδεση
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-beige-soft/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-green-natural uppercase">
              Admin panel
            </p>
            <h1 className="font-display text-2xl font-semibold text-green-deep sm:text-3xl">
              Φωτογραφίες έργων
            </h1>
          </div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="inline-flex items-center gap-2 rounded-xl border border-beige-soft bg-white px-4 py-2.5 text-sm font-semibold text-green-deep transition hover:bg-off-white"
          >
            <LogOut className="size-4" aria-hidden />
            Αποσύνδεση
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-8 px-5 py-8">
        <section className="rounded-[1.5rem] border border-beige-soft bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-green-deep">
                Νέο ανέβασμα
              </h2>
              <p className="mt-1 text-sm text-muted">
                JPEG, PNG, WebP ή GIF · έως 8MB. Οι φωτογραφίες εμφανίζονται στη
                συλλογή «Έργα».
              </p>
            </div>
            <p className="rounded-full bg-green-mist px-3 py-1 text-xs font-semibold text-green-deep">
              {blobEnabled ? "Vercel Blob ενεργό" : "Τοπική αποθήκευση"}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-green-deep">
              Περιγραφή (Ελληνικά)
              <input
                value={alt}
                onChange={(event) => setAlt(event.target.value)}
                className="mt-2 w-full rounded-xl border border-beige-soft bg-off-white px-4 py-3 outline-none ring-green-soft focus:ring-2"
                placeholder="π.χ. Κλάδεμα θάμνων σε αυλή"
              />
            </label>
            <label className="block text-sm font-medium text-green-deep">
              Περιγραφή (English, προαιρετικό)
              <input
                value={altEn}
                onChange={(event) => setAltEn(event.target.value)}
                className="mt-2 w-full rounded-xl border border-beige-soft bg-off-white px-4 py-3 outline-none ring-green-soft focus:ring-2"
                placeholder="e.g. Shrub pruning in a yard"
              />
            </label>
          </div>

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragOver(false);
              if (event.dataTransfer.files?.length) {
                void uploadFiles(event.dataTransfer.files);
              }
            }}
            className={`mt-6 rounded-[1.25rem] border-2 border-dashed px-6 py-10 text-center transition ${
              dragOver
                ? "border-green-natural bg-green-mist/50"
                : "border-beige bg-off-white/70"
            }`}
          >
            <ImagePlus className="mx-auto size-10 text-green-natural" aria-hidden />
            <p className="mt-3 font-medium text-green-deep">
              Σύρετε φωτογραφίες εδώ ή επιλέξτε αρχεία
            </p>
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-dark disabled:opacity-60"
            >
              {uploading ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
              ) : (
                <Upload className="size-4" aria-hidden />
              )}
              {uploading ? "Ανέβασμα…" : "Επιλογή αρχείων"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              className="hidden"
              onChange={(event) => {
                if (event.target.files?.length) {
                  void uploadFiles(event.target.files);
                }
              }}
            />
          </div>
        </section>

        {(error || notice || pending) && (
          <div className="space-y-2">
            {error ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p className="rounded-xl bg-green-mist px-4 py-3 text-sm text-green-deep">
                {notice}
              </p>
            ) : null}
          </div>
        )}

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold text-green-deep">
                Συλλογή ({photos.length})
              </h2>
              <p className="text-sm text-muted">
                Η σειρά εδώ είναι η σειρά εμφάνισης στην ιστοσελίδα.
              </p>
            </div>
          </div>

          {photos.length === 0 ? (
            <p className="rounded-[1.25rem] border border-beige-soft bg-white px-6 py-10 text-center text-muted">
              Δεν υπάρχουν φωτογραφίες ακόμη.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {photos.map((photo, index) => (
                <PhotoEditorCard
                  key={`${photo.id}:${photo.alt}:${photo.altEn ?? ""}`}
                  photo={photo}
                  index={index}
                  total={photos.length}
                  busy={busyId === photo.id}
                  onMove={(direction) => void movePhoto(index, direction)}
                  onSave={(nextAlt, nextAltEn) =>
                    void saveAlt(photo, nextAlt, nextAltEn)
                  }
                  onDelete={() => void removePhoto(photo.id)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

function PhotoEditorCard({
  photo,
  index,
  total,
  busy,
  onMove,
  onSave,
  onDelete,
}: {
  photo: GalleryPhoto;
  index: number;
  total: number;
  busy: boolean;
  onMove: (direction: -1 | 1) => void;
  onSave: (alt: string, altEn: string) => void;
  onDelete: () => void;
}) {
  const [localAlt, setLocalAlt] = useState(photo.alt);
  const [localAltEn, setLocalAltEn] = useState(photo.altEn ?? "");

  return (
    <li className="overflow-hidden rounded-[1.25rem] border border-beige-soft bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3] bg-green-mist/40">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 30vw"
          className="object-cover"
          unoptimized={photo.src.startsWith("http")}
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-muted uppercase">
            #{index + 1} · {photo.storage}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Μετακίνηση πάνω"
              disabled={busy || index === 0}
              onClick={() => onMove(-1)}
              className="rounded-lg border border-beige-soft p-2 text-green-deep disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Μετακίνηση κάτω"
              disabled={busy || index === total - 1}
              onClick={() => onMove(1)}
              className="rounded-lg border border-beige-soft p-2 text-green-deep disabled:opacity-40"
            >
              <ArrowDown className="size-4" />
            </button>
          </div>
        </div>

        <label className="block text-xs font-medium text-green-deep">
          Alt (EL)
          <input
            value={localAlt}
            onChange={(event) => setLocalAlt(event.target.value)}
            className="mt-1 w-full rounded-lg border border-beige-soft bg-off-white px-3 py-2 text-sm outline-none ring-green-soft focus:ring-2"
          />
        </label>

        <label className="block text-xs font-medium text-green-deep">
          Alt (EN)
          <input
            value={localAltEn}
            onChange={(event) => setLocalAltEn(event.target.value)}
            className="mt-1 w-full rounded-lg border border-beige-soft bg-off-white px-3 py-2 text-sm outline-none ring-green-soft focus:ring-2"
          />
        </label>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            disabled={busy}
            onClick={() => onSave(localAlt, localAltEn)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-deep px-3 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Αποθήκευση
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-red-700 disabled:opacity-60"
            aria-label="Διαγραφή"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </li>
  );
}
