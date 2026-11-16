/** Semua waktu di app ini memakai WIB (UTC+7, tanpa daylight saving). */
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const BULAN_PANJANG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** Date yang komponen UTC-nya sudah digeser ke WIB. Baca pakai getUTC*. */
export function wibNow(now = Date.now()) {
  return new Date(now + WIB_OFFSET_MS);
}

/** Tengah malam WIB hari ini (dalam representasi "geser WIB"). */
export function wibToday(now = Date.now()) {
  const d = wibNow(now);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function addDays(d: Date, days: number) {
  return new Date(d.getTime() + days * DAY_MS);
}

/** "Senin, 16 Nov" */
export function formatTanggal(d: Date) {
  return `${HARI[d.getUTCDay()]}, ${d.getUTCDate()} ${BULAN[d.getUTCMonth()]}`;
}

/** "16 November 2026" */
export function formatTanggalPanjang(d: Date) {
  return `${d.getUTCDate()} ${BULAN_PANJANG[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatTanggalIso(iso: string) {
  const [y, m, day] = iso.split("-").map(Number);
  return formatTanggalPanjang(new Date(Date.UTC(y, m - 1, day)));
}

/** "HH:mm" → menit sejak 00:00 */
export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function nowMinutesWib(now = Date.now()) {
  const d = wibNow(now);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
}

export function formatJamWib(now = Date.now(), withSeconds = false) {
  const d = wibNow(now);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return withSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
}

export function relativeTime(minutesAgo: number) {
  if (minutesAgo < 1) return "Barusan";
  if (minutesAgo < 60) return `${minutesAgo} menit lalu`;
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Kemarin" : `${days} hari lalu`;
}

export function greeting(now = Date.now()) {
  const h = wibNow(now).getUTCHours();
  if (h < 11) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
}
