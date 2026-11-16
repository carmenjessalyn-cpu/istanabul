import type { DayLog, FeedingEntry, FeedingStatus, Pet, PlayEntry } from "@/types";
import { addDays, nowMinutesWib, toMinutes, wibToday } from "./time";

export interface StayInfo {
  checkIn: Date;
  checkOut: Date;
  /** Hari ke berapa menginap (1-based). */
  dayNumber: number;
  totalDays: number;
  nightsLeft: number;
  today: DayLog;
  /** Log dari hari 1 sampai hari ini. */
  history: { log: DayLog; date: Date; isToday: boolean }[];
}

export function getStay(pet: Pet, now = Date.now()): StayInfo {
  const today = wibToday(now);
  const checkIn = addDays(today, pet.booking.checkInOffsetDays);
  const checkOut = addDays(checkIn, pet.booking.nights);
  const rawDay = -pet.booking.checkInOffsetDays + 1;
  const dayNumber = Math.min(Math.max(rawDay, 1), pet.logs.length);
  const nightsLeft = Math.max(
    0,
    Math.round((checkOut.getTime() - today.getTime()) / (24 * 60 * 60 * 1000)),
  );
  const history = pet.logs.slice(0, dayNumber).map((log, i) => ({
    log,
    date: addDays(checkIn, i),
    isToday: i === dayNumber - 1,
  }));
  return {
    checkIn,
    checkOut,
    dayNumber,
    totalDays: pet.booking.nights + 1,
    nightsLeft,
    today: pet.logs[dayNumber - 1],
    history,
  };
}

export interface FeedingView extends FeedingEntry {
  status: FeedingStatus;
  isPast: boolean;
}

export interface PlayView extends PlayEntry {
  isPast: boolean;
  isNow: boolean;
}

/**
 * Hari ini: item yang jamnya belum lewat ditampilkan "Terjadwal".
 * Hari sebelumnya: semua item sudah lewat.
 */
export function feedingView(entries: FeedingEntry[], isToday: boolean, nowMin: number): FeedingView[] {
  return entries.map((f) => {
    const isPast = !isToday || toMinutes(f.time) <= nowMin;
    return { ...f, isPast, status: isPast ? f.result : "terjadwal" };
  });
}

export function playView(entries: PlayEntry[], isToday: boolean, nowMin: number): PlayView[] {
  return entries.map((p) => {
    const start = toMinutes(p.time);
    const end = start + p.durationMin;
    const isNow = isToday && nowMin >= start && nowMin < end;
    const isPast = !isToday || nowMin >= end;
    return { ...p, isPast, isNow };
  });
}

export function totalPlayMinutes(plays: PlayView[]) {
  return plays
    .filter((p) => p.isPast || p.isNow)
    .reduce((sum, p) => sum + p.durationMin, 0);
}

/** Status singkat yang terasa "live", dihitung dari jam WIB sekarang. */
export function currentActivity(pet: Pet, log: DayLog, now = Date.now()) {
  const m = nowMinutesWib(now);
  const playing = log.plays.find((p) => {
    const s = toMinutes(p.time);
    return m >= s && m < s + p.durationMin;
  });
  if (playing) return `Lagi ${playing.activity.toLowerCase()}`;

  const eating = log.feedings.find((f) => {
    const s = toMinutes(f.time);
    return m >= s && m < s + 20;
  });
  if (eating) return "Lagi makan, jangan diganggu dulu";

  const dog = pet.species === "anjing";
  const h = Math.floor(m / 60);
  if (h < 5) return "Tidur pulas";
  if (h < 8) return dog ? "Baru bangun, ekornya udah goyang" : "Baru bangun, lagi ngulet";
  if (h < 12) return dog ? "Lagi santai di kamar" : "Lagi duduk manis dekat jendela";
  if (h < 15) return "Lagi tidur siang";
  if (h < 18) return dog ? "Lagi rebahan di teras" : "Lagi jemur badan dekat jendela";
  if (h < 21) return "Lagi santai habis makan";
  return "Siap-siap tidur";
}
