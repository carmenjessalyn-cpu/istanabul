import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { BookingInfo } from "@/components/BookingInfo";
import { ConditionCard } from "@/components/ConditionCard";
import { DailyHistory, type HistoryDay } from "@/components/DailyHistory";
import { FeedingTimeline } from "@/components/FeedingTimeline";
import { HealthCheckCard } from "@/components/HealthCheckCard";
import { PetActions } from "@/components/PetActions";
import { PlaytimeTimeline } from "@/components/PlaytimeTimeline";
import { VideoCctv } from "@/components/VideoCctv";
import { PetAvatar } from "@/components/illustrations";
import { findPet, petsByOwner } from "@/data/pets";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_LABEL, findSitter, sitters } from "@/data/sitters";
import { requireUser } from "@/lib/auth";
import { currentActivity, feedingView, getStay, playView } from "@/lib/stay";
import { formatJamWib, formatTanggal, nowMinutesWib } from "@/lib/time";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pet = findPet(id);
  return { title: pet ? `Kamar ${pet.name}` : "Anabul tidak ditemukan" };
}

export default async function AnabulPage({ params }: Props) {
  const { id } = await params;
  const user = await requireUser();
  const pet = findPet(id);
  // anabul milik akun lain juga dianggap tidak ada
  if (!pet || pet.ownerId !== user.id) notFound();

  const now = Date.now();
  const nowMin = nowMinutesWib(now);
  const nowLabel = formatJamWib(now);
  const stay = getStay(pet, now);
  const sitter = findSitter(pet.sitterId) ?? sitters[0];
  const siblings = petsByOwner(user.id);

  const history: HistoryDay[] = stay.history.map(({ log, date, isToday }) => ({
    day: log.day,
    dateLabel: formatTanggal(date),
    isToday,
    condition: log.condition,
    feedings: feedingView(log.feedings, isToday, nowMin),
    plays: playView(log.plays, isToday, nowMin),
  }));
  const today = history[history.length - 1];

  return (
    <div className="animate-fade-up">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-3 border-plum bg-card text-plum hover:bg-peach"
            aria-label="Kembali ke beranda"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
          <span className="hidden h-14 w-14 shrink-0 overflow-hidden rounded-full border-3 border-plum sm:block">
            <PetAvatar kind={pet.illustration} className="h-full w-full" title={`Ilustrasi ${pet.name}`} />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">{pet.name}</h1>
            <p className="text-sm font-semibold text-ink">
              {pet.breed} · {pet.room} · Hari ke-{stay.dayNumber}
            </p>
          </div>
        </div>
        {siblings.length > 1 && (
          <nav aria-label="Ganti anabul" className="flex gap-2">
            {siblings.map((s) => {
              const active = s.id === pet.id;
              return (
                <Link
                  key={s.id}
                  href={`/anabul/${s.id}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[44px] items-center gap-2 rounded-full border-3 py-1 pl-1 pr-3.5 font-display font-semibold text-plum transition-colors duration-200 ${
                    active ? "border-plum bg-sun" : "border-plum/30 bg-card hover:border-plum"
                  }`}
                >
                  <span className="h-8 w-8 overflow-hidden rounded-full border-2 border-plum">
                    <PetAvatar kind={s.illustration} className="h-full w-full" />
                  </span>
                  {s.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      <p className="mt-4 flex items-center gap-2 rounded-2xl border-3 border-plum bg-mint px-4 py-2.5 font-display font-semibold text-plum">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-plum" aria-hidden="true" />
        {currentActivity(pet, stay.today, now)}, tenang aja ya.
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-6">
        {/* kolom kiri atas: video */}
        <div className="space-y-4 lg:col-start-1 lg:row-start-1">
          <VideoCctv src={`/cctv/${encodeURIComponent(pet.cctvFile)}`} room={pet.room} petName={pet.name} sitterName={sitter.name} />
          <PetActions
            petName={pet.name}
            sitter={sitter}
            emergencyPhone={EMERGENCY_PHONE}
            emergencyLabel={EMERGENCY_PHONE_LABEL}
          />
        </div>

        {/* kolom kanan: kondisi, makan, main */}
        <div className="space-y-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:space-y-6">
          <ConditionCard
            petName={pet.name}
            condition={stay.today.condition}
            sitter={sitter}
            checkInWeight={pet.healthCheck.weightKg}
          />
          <FeedingTimeline items={today.feedings} nowLabel={nowLabel} headingId="makan-heading" />
          <PlaytimeTimeline items={today.plays} nowLabel={nowLabel} headingId="main-heading" />
        </div>

        {/* kolom kiri bawah: riwayat, booking, kesehatan */}
        <div className="space-y-5 self-start lg:col-start-1 lg:row-start-2 lg:space-y-6">
          <DailyHistory days={history} petName={pet.name} />
          <div className="grid gap-5 xl:grid-cols-2 xl:gap-6">
            <BookingInfo
              booking={pet.booking}
              checkInLabel={formatTanggal(stay.checkIn)}
              checkOutLabel={formatTanggal(stay.checkOut)}
            />
            <HealthCheckCard
              check={pet.healthCheck}
              species={pet.species}
              dateLabel={`${formatTanggal(stay.checkIn)}, ${pet.booking.checkInTime} WIB`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
