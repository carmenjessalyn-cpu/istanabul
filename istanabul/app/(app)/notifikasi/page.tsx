import type { Metadata } from "next";
import { NotificationList } from "@/components/NotificationList";
import { notificationsForUser } from "@/data/notifications";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Notifikasi" };

export default async function NotifikasiPage() {
  const user = await requireUser();
  const items = notificationsForUser(user.id);

  return (
    <div className="mx-auto max-w-3xl animate-fade-up">
      <h1 className="text-3xl font-semibold sm:text-4xl">Notifikasi</h1>
      <p className="mt-1 text-lg text-ink">Kabar terbaru dari kamar anabul kamu.</p>
      <div className="mt-6">
        <NotificationList initial={items} />
      </div>
    </div>
  );
}
