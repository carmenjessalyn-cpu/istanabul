import { Check, Clock3, Minus, X } from "lucide-react";
import type { FeedingStatus } from "@/types";
import type { FeedingView } from "@/lib/stay";

const STATUS: Record<FeedingStatus, { label: string; cls: string; Icon: typeof Check }> = {
  habis: { label: "Habis", cls: "bg-mint", Icon: Check },
  "sisa-sedikit": { label: "Sisa sedikit", cls: "bg-sun", Icon: Minus },
  "belum-dimakan": { label: "Belum dimakan", cls: "bg-pink", Icon: X },
  terjadwal: { label: "Terjadwal", cls: "bg-card border-dashed", Icon: Clock3 },
};

export function FeedingTimeline({
  items,
  nowLabel,
  title = "Jadwal makan",
  compact = false,
  headingId,
}: {
  items: FeedingView[];
  /** Jam sekarang, hanya untuk hari ini. */
  nowLabel?: string;
  title?: string;
  compact?: boolean;
  headingId?: string;
}) {
  const firstFuture = items.findIndex((i) => !i.isPast);
  const done = items.filter((i) => i.isPast).length;

  return (
    <section className={compact ? "" : "card p-4 sm:p-5"} aria-labelledby={headingId}>
      <div className="flex items-baseline justify-between gap-2">
        <h3 id={headingId} className={compact ? "text-lg font-semibold" : "text-xl font-semibold"}>
          {title}
        </h3>
        <span className="text-sm font-semibold text-ink">
          {done}/{items.length} selesai
        </span>
      </div>

      <ol className="relative mt-4">
        {items.map((item, i) => {
          const s = STATUS[item.status];
          const showNow = nowLabel && i === firstFuture;
          return (
            <li key={`${item.time}-${i}`} className="relative">
              {showNow && <NowMarker label={nowLabel} />}
              <div className="relative flex gap-3 pb-4 last:pb-0">
                {/* garis timeline */}
                {i < items.length - 1 && (
                  <span
                    className={`absolute left-[17px] top-9 h-[calc(100%-28px)] w-0 border-l-[3px] ${
                      item.isPast && items[i + 1]?.isPast ? "border-plum" : "border-dashed border-plum/35"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-3 ${
                    item.isPast ? `border-plum ${s.cls}` : "border-dashed border-plum/50 bg-cream"
                  }`}
                  aria-hidden="true"
                >
                  <s.Icon className={`h-4 w-4 ${item.isPast ? "text-plum" : "text-ink"}`} strokeWidth={3} />
                </span>
                <div
                  className={`min-w-0 flex-1 rounded-2xl px-3 py-2 ${
                    item.isPast ? "bg-cream" : "border-2 border-dashed border-plum/30"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <span className={`font-display text-lg font-semibold tabular-nums ${item.isPast ? "text-plum" : "text-ink"}`}>
                      {item.time}
                    </span>
                    <span className={`chip ${s.cls} ${item.isPast ? "" : "border-plum/50 text-ink"}`}>
                      {s.label}
                    </span>
                  </div>
                  <p className={`mt-0.5 font-semibold ${item.isPast ? "text-plum-2" : "text-ink"}`}>{item.menu}</p>
                  <p className="text-sm text-ink">Porsi {item.portion}</p>
                </div>
              </div>
            </li>
          );
        })}
        {nowLabel && firstFuture === -1 && (
          <li>
            <NowMarker label={nowLabel} end />
          </li>
        )}
      </ol>
    </section>
  );
}

export function NowMarker({ label, end = false }: { label: string; end?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${end ? "mt-3" : "mb-3"}`}>
      <span className="chip shrink-0 border-coral bg-coral text-plum">Sekarang {label}</span>
      <span className="h-0 flex-1 border-t-[3px] border-coral" aria-hidden="true" />
    </div>
  );
}
