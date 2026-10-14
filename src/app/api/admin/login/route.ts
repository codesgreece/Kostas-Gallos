import { NextResponse } from "next/server";
import {
  adminSessionCookieOptions,
  ADMIN_COOKIE,
  createAdminSessionToken,
  isAdminConfigured,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Δεν έχει οριστεί ADMIN_PASSWORD. Προσθέστε το στο .env.local ή στο Vercel.",
      },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Μη έγκυρο αίτημα." }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json(
      { error: "Λάθος κωδικός πρόσβασης." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_COOKIE,
    createAdminSessionToken(),
    adminSessionCookieOptions(),
  );
  return response;
}
