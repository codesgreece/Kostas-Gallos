import AdminPanel from "@/components/admin/AdminPanel";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";
import { getPhotos, usesBlobStorage } from "@/lib/photos";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const authenticated = configured ? await isAdminAuthenticated() : false;
  const photos = authenticated ? await getPhotos() : [];

  return (
    <AdminPanel
      initialAuthenticated={authenticated}
      configured={configured}
      blobEnabled={usesBlobStorage()}
      initialPhotos={photos}
    />
  );
}
