import Link from "next/link";
import { ArrowRight, BedDouble, CalendarDays } from "lucide-react";
import { PET_BG, PetAvatar } from "./illustrations";
import type { Pet } from "@/types";

export function PetCard({
  pet,
  status,
  nightsLeft,
  dayNumber,
  totalDays,
  checkOutLabel,
}: {
  pet: Pet;
  status: string;
  nightsLeft: number;
  dayNumber: number;
  totalDays: number;
  checkOutLabel: string;
}) {
  const progress = Math.round((dayNumber / totalDays) * 100);
  return (
    <article className="card group relative flex flex-col overflow-hidden sm:flex-row">
      <div
        className="relative flex aspect-[16/9] w-full shrink-0 items-center justify-center border-b-3 border-plum sm:aspect-auto sm:w-48 sm:border-b-0 sm:border-r-3 md:border-r-4"
        style={{ backgroundColor: PET_BG[pet.illustration] }}
      >
        <PetAvatar
          kind={pet.illustration}
          className="h-full max-h-56 w-full"
          title={`Ilustrasi ${pet.name}, ${pet.breed}`}
        />
        <span className="chip absolute left-3 top-3 bg-card">
          <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
          {pet.room}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">{pet.name}</h3>
            <p className="text-sm font-semibold text-ink">
              {pet.breed} · {pet.ageLabel}
            </p>
          </div>
          <span className="chip bg-lilac">{pet.booking.package}</span>
        </div>

        <p className="mt-3 flex items-center gap-2 rounded-2xl bg-mint px-3 py-2 font-display font-semibold text-plum">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-mint-deep motion-safe:animate-ping" aria-hidden="true" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-plum" aria-hidden="true" />
          </span>
          {status}
        </p>

        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-2 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-ink">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Hari ke-{dayNumber} dari {totalDays}
            </span>
            <span className="font-display font-semibold text-plum">
              {nightsLeft > 0 ? `${nightsLeft} hari lagi` : "Pulang hari ini"}
            </span>
          </div>
          <div
            className="mt-1.5 h-3 overflow-hidden rounded-full border-2 border-plum bg-cream"
            role="progressbar"
            aria-label={`Progres menginap ${pet.name}`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full rounded-full bg-sun" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-ink">Check-out {checkOutLabel}</p>
        </div>

        <Link href={`/anabul/${pet.id}`} className="btn-primary mt-4 self-start">
          Lihat kamar {pet.name}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
