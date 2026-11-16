import { Timer } from "lucide-react";
import { totalPlayMinutes, type PlayView } from "@/lib/stay";
import { NowMarker } from "./FeedingTimeline";

const BAR_COLORS = ["bg-mint-deep", "bg-sun", "bg-pink", "bg-lilac"];

export function PlaytimeTimeline({
  items,
  nowLabel,
  title = "Play time",
  compact = false,
  headingId,
}: {
  items: PlayView[];
  nowLabel?: string;
  title?: string;
  compact?: boolean;
  headingId?: string;
}) {
  const total = totalPlayMinutes(items);
  const planned = items.reduce((s, p) => s + p.durationMin, 0);
  const longest = Math.max(...items.map((p) => p.durationMin), 1);
  const firstFuture = items.findIndex((i) => !i.isPast && !i.isNow);

  return (
    <section className={compact ? "" : "card p-4 sm:p-5"} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h3 id={headingId} className={compact ? "text-lg font-semibold" : "text-xl font-semibold"}>
          {title}
        </h3>
        <div className="flex items-center gap-2 rounded-2xl border-3 border-plum bg-mint px-3 py-1.5">
          <Timer className="h-4 w-4 text-plum" aria-hidden="true" />
          <span className="font-display text-sm font-semibold text-plum">
            <span className="text-xl font-bold tabular-nums">{total}</span> menit
            {nowLabel && total < planned && <span className="font-medium text-plum-2"> dari {planned}</span>}
          </span>
        </div>
      </div>

      <ol className="mt-4 space-y-2.5">
        {items.map((p, i) => (
          <li key={`${p.time}-${i}`}>
            {nowLabel && i === firstFuture && <NowMarker label={nowLabel} />}
            <div
              className={`grid grid-cols-[52px_1fr] items-center gap-3 rounded-2xl px-3 py-2.5 ${
                p.isPast || p.isNow ? "bg-cream" : "border-2 border-dashed border-plum/30"
              }`}
            >
              <span className={`font-display text-base font-semibold tabular-nums ${p.isPast || p.isNow ? "text-plum" : "text-ink"}`}>
                {p.time}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <span className={`font-semibold ${p.isPast || p.isNow ? "text-plum-2" : "text-ink"}`}>{p.activity}</span>
                  {p.isNow ? (
                    <span className="chip bg-coral">Lagi berlangsung</span>
                  ) : !p.isPast ? (
                    <span className="chip border-dashed border-plum/50 text-ink">Nanti</span>
                  ) : null}
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-peach" aria-hidden="true">
                    <span
                      className={`block h-full rounded-full ${p.isPast || p.isNow ? BAR_COLORS[i % BAR_COLORS.length] : "bg-plum/15"}`}
                      style={{ width: `${(p.durationMin / longest) * 100}%` }}
                    />
                  </span>
                  <span className="w-16 shrink-0 text-right text-sm font-semibold text-ink">{p.durationMin} menit</span>
                </div>
                {p.note && <p className="mt-1 text-sm text-ink">{p.note}</p>}
              </div>
            </div>
          </li>
        ))}
        {nowLabel && firstFuture === -1 && (
          <li>
            <NowMarker label={nowLabel} end />
          </li>
        )}
      </ol>
    </section>
  );
}
