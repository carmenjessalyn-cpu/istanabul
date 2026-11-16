import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Clock3, UtensilsCrossed } from "lucide-react";
import { PetCard } from "@/components/PetCard";
import { notificationsForUser } from "@/data/notifications";
import { petsByOwner } from "@/data/pets";
import { requireUser } from "@/lib/auth";
import { currentActivity, feedingView, getStay } from "@/lib/stay";
import { formatTanggal, greeting, nowMinutesWib, relativeTime, wibToday } from "@/lib/time";

export const metadata: Metadata = { title: "Beranda" };

export default async function DashboardPage() {
  const user = await requireUser();
  const now = Date.now();
  const nowMin = nowMinutesWib(now);
  const pets = petsByOwner(user.id);
  const latest = notificationsForUser(user.id)[0];

  const rows = pets.map((pet) => {
    const stay = getStay(pet, now);
    const next = feedingView(stay.today.feedings, true, nowMin).find((f) => !f.isPast);
    return { pet, stay, next, status: currentActivity(pet, stay.today, now) };
  });

  const upcoming = rows
    .filter((r) => r.next)
    .sort((a, b) => a.next!.time.localeCompare(b.next!.time))[0];

  return (
    <div className="animate-fade-up">
      <section>
        <p className="font-display font-semibold text-coral-text">{formatTanggal(wibToday(now))}</p>
        <h1 className="mt-1 text-3xl font-semibold leading-tight sm:text-4xl">
          {greeting(now)}, {user.nickname}!
        </h1>
        <p className="mt-2 max-w-xl text-lg text-ink">
          {pets.length > 1
            ? `${pets.map((p) => p.name).join(" dan ")} lagi aman di istana. Ini kabar mereka hari ini.`
            : `${pets[0]?.name} lagi aman di istana. Ini kabarnya hari ini.`}
        </p>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-labelledby="anabul-heading">
          <h2 id="anabul-heading" className="sr-only">
            Anabul yang sedang dititip
          </h2>
          <div className="space-y-5">
            {rows.map(({ pet, stay, status }) => (
              <PetCard
                key={pet.id}
                pet={pet}
                status={status}
                nightsLeft={stay.nightsLeft}
                dayNumber={stay.dayNumber}
                totalDays={stay.totalDays}
                checkOutLabel={`${formatTanggal(stay.checkOut)}, ${pet.booking.checkOutTime} WIB`}
              />
            ))}
          </div>
        </section>

        <aside className="flex flex-col gap-4 self-start sm:flex-row xl:flex-col" aria-label="Rangkuman">
          <div className="flex-1 rounded-3xl border-3 border-plum bg-sun p-4 xl:flex-none">
            <p className="flex items-center gap-2 font-display text-sm font-semibold text-plum">
              <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
              Jadwal makan berikutnya
            </p>
            {upcoming ? (
              <>
                <p className="mt-2 font-display text-4xl font-bold text-plum">{upcoming.next!.time}</p>
                <p className="mt-1 text-plum-2">
                  <span className="font-bold">{upcoming.pet.name}</span> · {upcoming.next!.menu}
                </p>
              </>
            ) : (
              <p className="mt-2 font-display text-lg font-semibold text-plum">
                Semua jadwal makan hari ini udah beres. Tinggal bobo.
              </p>
            )}
          </div>

          {latest && (
            <Link
              href="/notifikasi"
              className="flex-1 rounded-3xl border-3 border-plum bg-card p-4 transition-colors duration-200 hover:bg-peach xl:flex-none"
            >
              <p className="flex items-center gap-2 font-display text-sm font-semibold text-plum">
                <Bell className="h-4 w-4" aria-hidden="true" />
                Kabar terbaru
              </p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug text-plum">{latest.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-ink">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                {relativeTime(latest.minutesAgo)}
              </p>
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
