import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { Sidebar } from "@/components/Sidebar";
import { Mascot } from "@/components/illustrations";
import { notificationsForUser } from "@/data/notifications";
import { petsByOwner } from "@/data/pets";
import { requireUser } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const pets = petsByOwner(user.id).map(({ id, name, room, illustration }) => ({ id, name, room, illustration }));
  const unread = notificationsForUser(user.id).filter((n) => !n.read).length;

  return (
    <div className="flex min-h-dvh">
      <a
        href="#konten"
        className="sr-only z-50 rounded-full bg-sun px-4 py-2 font-display font-semibold text-plum focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Langsung ke konten
      </a>
      <Sidebar userName={user.name} pets={pets} unread={unread} />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b-3 border-plum bg-cream px-4 py-2.5 lg:hidden">
          <Link href="/dashboard" className="flex min-h-[44px] items-center gap-2 rounded-xl">
            <Mascot className="h-9 w-9" title="Logo Istanabul" />
            <span className="font-display text-xl font-bold text-plum">Istanabul</span>
          </Link>
          <span className="chip bg-mint">
            <span className="h-2 w-2 rounded-full bg-plum" aria-hidden="true" />
            {pets.length} anabul aman
          </span>
        </header>
        <main id="konten" className="mx-auto w-full max-w-[1280px] px-4 pb-32 pt-5 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">
          {children}
        </main>
      </div>
      <BottomNav firstPetId={pets[0]?.id} unread={unread} />
    </div>
  );
}
