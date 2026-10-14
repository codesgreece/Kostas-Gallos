import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { reorderPhotos } from "@/lib/photos";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Μη εξουσιοδοτημένο." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { orderedIds?: unknown };
    if (
      !Array.isArray(body.orderedIds) ||
      !body.orderedIds.every((id) => typeof id === "string")
    ) {
      return NextResponse.json(
        { error: "Απαιτείται λίστα orderedIds." },
        { status: 400 },
      );
    }

    const photos = await reorderPhotos(body.orderedIds);
    return NextResponse.json({ photos });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Αποτυχία αναδιάταξης.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
