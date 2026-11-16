"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, CheckCheck, HeartPulse, Info, PartyPopper, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { EmptyBox } from "./illustrations";
import { relativeTime } from "@/lib/time";
import type { AppNotification, NotificationKind } from "@/types";

const KIND: Record<NotificationKind, { Icon: LucideIcon; bg: string; label: string }> = {
  makan: { Icon: UtensilsCrossed, bg: "bg-sun", label: "Makan" },
  main: { Icon: PartyPopper, bg: "bg-mint", label: "Main" },
  kesehatan: { Icon: HeartPulse, bg: "bg-pink", label: "Kesehatan" },
  foto: { Icon: Camera, bg: "bg-lilac", label: "Foto" },
  info: { Icon: Info, bg: "bg-peach", label: "Info" },
};

type Filter = "semua" | "belum";

export function NotificationList({ initial }: { initial: AppNotification[] }) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<Filter>("semua");
  const unread = items.filter((n) => !n.read).length;
  const shown = filter === "semua" ? items : items.filter((n) => !n.read);

  const markRead = (id: string) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Filter notifikasi" className="inline-flex rounded-full border-3 border-plum bg-card p-1">
          {(
            [
              ["semua", `Semua (${items.length})`],
              ["belum", `Belum dibaca (${unread})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`min-h-[44px] rounded-full px-4 font-display text-sm font-semibold text-plum transition-colors duration-200 ${
                filter === key ? "bg-sun" : "hover:bg-peach"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setItems((list) => list.map((n) => ({ ...n, read: true })))}
          disabled={unread === 0}
          className="btn-secondary text-sm"
        >
          <CheckCheck className="h-4 w-4" aria-hidden="true" />
          Tandai semua dibaca
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center px-6 py-10 text-center animate-fade-up">
          <EmptyBox className="h-auto w-48" title="Kucing ngintip dari kardus kosong" />
          <p className="mt-4 font-display text-2xl font-semibold text-plum">
            {filter === "belum" ? "Semua kabar udah kamu baca" : "Belum ada kabar baru"}
          </p>
          <p className="mt-1 max-w-sm text-ink">
            Kardusnya kosong, cuma ada yang ngintip. Nanti kalau anabul kamu makan atau main, kabarnya muncul di sini.
          </p>
          {filter === "belum" && (
            <button type="button" onClick={() => setFilter("semua")} className="btn-primary mt-5">
              Lihat semua notifikasi
            </button>
          )}
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {shown.map((n) => {
            const k = KIND[n.kind];
            const body = (
              <>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-3 border-plum ${k.bg}`}
                  aria-hidden="true"
                >
                  <k.Icon className="h-5 w-5 text-plum" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2">
                    <span className={`font-display text-base leading-snug text-plum ${n.read ? "font-medium" : "font-semibold"}`}>
                      {n.title}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm text-ink">{n.body}</span>
                  <span className="mt-1.5 block text-xs font-bold text-ink">
                    {k.label} · {relativeTime(n.minutesAgo)}
                  </span>
                </span>
                {!n.read && (
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-plum bg-coral">
                    <span className="sr-only">Belum dibaca</span>
                  </span>
                )}
              </>
            );
            const cls = `flex items-start gap-3 rounded-3xl border-3 p-3.5 transition-colors duration-200 ${
              n.read ? "border-plum/25 bg-card hover:border-plum" : "border-plum bg-card shadow-block-xs hover:bg-peach"
            }`;
            return (
              <li key={n.id}>
                {n.petId ? (
                  <Link href={`/anabul/${n.petId}`} className={cls} onClick={() => markRead(n.id)}>
                    {body}
                  </Link>
                ) : (
                  <button type="button" className={`${cls} w-full text-left`} onClick={() => markRead(n.id)}>
                    {body}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
