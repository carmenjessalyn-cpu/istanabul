"use client";

import { useId, useRef, useState } from "react";
import { FeedingTimeline } from "./FeedingTimeline";
import { PlaytimeTimeline } from "./PlaytimeTimeline";
import type { FeedingView, PlayView } from "@/lib/stay";
import type { DayCondition } from "@/types";

export interface HistoryDay {
  day: number;
  dateLabel: string;
  isToday: boolean;
  condition: DayCondition;
  feedings: FeedingView[];
  plays: PlayView[];
}

export function DailyHistory({ days, petName }: { days: HistoryDay[]; petName: string }) {
  // default: hari sebelumnya (hari ini sudah tampil di atas)
  const [active, setActive] = useState(Math.max(0, days.length - 2));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const day = days[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % days.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + days.length) % days.length;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="card p-4 sm:p-5" aria-labelledby={`${baseId}-h`}>
      <h2 id={`${baseId}-h`} className="text-xl font-semibold">
        Riwayat harian
      </h2>
      <p className="mt-1 text-ink">Pilih hari buat lihat log makan dan main {petName} sebelumnya.</p>

      <div role="tablist" aria-label="Pilih hari menginap" className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => {
          const selected = i === active;
          return (
            <button
              key={d.day}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-[52px] shrink-0 rounded-2xl border-3 px-3.5 py-1.5 text-left transition-colors duration-200 ${
                selected ? "border-plum bg-sun shadow-block-xs" : "border-plum/30 bg-card hover:border-plum hover:bg-peach"
              }`}
            >
              <span className="block font-display font-semibold leading-tight text-plum">
                Hari {d.day}
                {d.isToday && " · Hari ini"}
              </span>
              <span className="block text-xs font-semibold text-ink">{d.dateLabel}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        key={day.day}
        className="mt-4 animate-fade-up"
      >
        <div className="flex flex-wrap gap-2">
          <span className="chip bg-mint">Mood: {day.condition.mood}</span>
          <span className="chip bg-peach">Makan: {day.condition.appetite}</span>
          <span className="chip bg-lilac">
            Berat: {day.condition.weightKg.toLocaleString("id-ID", { minimumFractionDigits: 1 })} kg
          </span>
        </div>
        <p className="mt-3 rounded-2xl bg-cream p-3 text-plum-2">&ldquo;{day.condition.sitterNote}&rdquo;</p>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <FeedingTimeline items={day.feedings} title="Log makan" compact headingId={`${baseId}-makan`} />
          <PlaytimeTimeline items={day.plays} title="Log main" compact headingId={`${baseId}-main`} />
        </div>
      </div>
    </section>
  );
}
