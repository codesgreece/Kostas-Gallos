import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { addPhoto, getPhotos } from "@/lib/photos";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Μη εξουσιοδοτημένο." }, { status: 401 });
  }

  const photos = await getPhotos();
  return NextResponse.json({ photos });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Μη εξουσιοδοτημένο." }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Λείπει το αρχείο εικόνας." },
        { status: 400 },
      );
    }

    const alt = form.get("alt");
    const altEn = form.get("altEn");

    const photo = await addPhoto({
      file,
      alt: typeof alt === "string" ? alt : undefined,
      altEn: typeof altEn === "string" ? altEn : undefined,
    });

    return NextResponse.json({ photo }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Αποτυχία ανεβάσματος.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
