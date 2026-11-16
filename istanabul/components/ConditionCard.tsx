import { Scale, Smile, UtensilsCrossed } from "lucide-react";
import { SitterAvatar } from "./illustrations";
import type { DayCondition, Sitter } from "@/types";

const MOOD_BG: Record<string, string> = {
  Ceria: "bg-sun",
  Santai: "bg-mint",
  "Agak manja": "bg-pink",
  Ngantuk: "bg-lilac",
};

function formatKg(n: number) {
  return n.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function ConditionCard({
  petName,
  condition,
  sitter,
  checkInWeight,
}: {
  petName: string;
  condition: DayCondition;
  sitter: Sitter;
  checkInWeight: number;
}) {
  const diff = Math.round((condition.weightKg - checkInWeight) * 10) / 10;
  const diffLabel =
    diff === 0 ? "Sama kayak pas check-in" : `${diff > 0 ? "+" : "−"}${formatKg(Math.abs(diff))} kg dari check-in`;

  return (
    <section className="card p-4 sm:p-5" aria-labelledby="kondisi-heading">
      <div className="flex items-baseline justify-between gap-2">
        <h2 id="kondisi-heading" className="text-xl font-semibold">
          Kondisi hari ini
        </h2>
        <span className="text-sm font-semibold text-ink">Update 15 menit lalu</span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <div className={`rounded-2xl border-3 border-plum p-2.5 sm:p-3 ${MOOD_BG[condition.mood] ?? "bg-mint"}`}>
          <dt className="flex items-center gap-1 text-xs font-bold text-plum-2">
            <Smile className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Mood
          </dt>
          <dd className="mt-1 font-display text-base font-semibold leading-tight text-plum sm:text-lg">{condition.mood}</dd>
        </div>
        <div className="rounded-2xl border-3 border-plum bg-peach p-2.5 sm:p-3">
          <dt className="flex items-center gap-1 text-xs font-bold text-plum-2">
            <UtensilsCrossed className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Nafsu makan
          </dt>
          <dd className="mt-1 font-display text-base font-semibold leading-tight text-plum sm:text-lg">{condition.appetite}</dd>
        </div>
        <div className="rounded-2xl border-3 border-plum bg-lilac p-2.5 sm:p-3">
          <dt className="flex items-center gap-1 text-xs font-bold text-plum-2">
            <Scale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Berat
          </dt>
          <dd className="mt-1 font-display text-base font-semibold leading-tight text-plum sm:text-lg">
            {formatKg(condition.weightKg)} kg
          </dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-ink">Berat: {diffLabel}</p>

      <figure className="mt-4 rounded-2xl bg-cream p-3.5">
        <blockquote className="text-plum-2">
          <p>&ldquo;{condition.sitterNote}&rdquo;</p>
        </blockquote>
        <figcaption className="mt-3 flex items-center gap-3">
          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-3 border-plum">
            <SitterAvatar variant={sitter.avatar} className="h-full w-full" title={`Foto ${sitter.name}`} />
          </span>
          <span>
            <span className="block font-display font-semibold text-plum">{sitter.name}</span>
            <span className="block text-sm text-ink">
              {sitter.role}, jagain {petName} hari ini
            </span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
