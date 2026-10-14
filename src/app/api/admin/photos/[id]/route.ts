import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deletePhoto, updatePhoto } from "@/lib/photos";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Μη εξουσιοδοτημένο." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = (await request.json()) as { alt?: string; altEn?: string };
    const photo = await updatePhoto(id, body);
    return NextResponse.json({ photo });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Αποτυχία ενημέρωσης.";
    const status = message.includes("δεν βρέθηκε") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Μη εξουσιοδοτημένο." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await deletePhoto(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Αποτυχία διαγραφής.";
    const status = message.includes("δεν βρέθηκε") ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
