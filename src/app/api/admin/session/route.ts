import { NextResponse } from "next/server";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { usesBlobStorage } from "@/lib/photos";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    authenticated,
    configured: isAdminConfigured(),
    blobEnabled: usesBlobStorage(),
  });
}
