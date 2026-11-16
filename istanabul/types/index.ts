export type Species = "kucing" | "anjing";

export type PetIllustration = "persia" | "domestik" | "golden";

export type Mood = "Ceria" | "Santai" | "Agak manja" | "Ngantuk";

export type Appetite = "Lahap" | "Normal" | "Pilih-pilih";

export type PackageName = "Meong Hemat" | "Nyaman Pol" | "Sultan Anabul";

/** Status yang dicatat sitter setelah jam makan lewat. */
export type FeedingResult = "habis" | "sisa-sedikit" | "belum-dimakan";

/** Status yang ditampilkan di UI, termasuk "terjadwal" untuk jam yang belum lewat. */
export type FeedingStatus = FeedingResult | "terjadwal";

export interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  memberSince: string; // ISO date
  petIds: string[];
}

/** User tanpa password, aman dikirim ke komponen. */
export type PublicUser = Omit<User, "password">;

export interface Sitter {
  id: string;
  name: string;
  role: string;
  avatar: "sitter-a" | "sitter-b" | "sitter-c";
  phone: string;
}

export interface FeedingEntry {
  time: string; // "HH:mm" WIB
  menu: string;
  portion: string;
  result: FeedingResult;
  note?: string;
}

export interface PlayEntry {
  time: string; // "HH:mm" WIB
  durationMin: number;
  activity: string;
  note?: string;
}

export interface DayCondition {
  mood: Mood;
  appetite: Appetite;
  weightKg: number;
  sitterNote: string;
}

export interface DayLog {
  day: number; // hari ke-n menginap, mulai dari 1
  condition: DayCondition;
  feedings: FeedingEntry[];
  plays: PlayEntry[];
}

export interface HealthCheck {
  temperatureC: number;
  weightKg: number;
  coatSkin: string;
  vetName: string;
  vetNote: string;
}

export interface Booking {
  code: string;
  /** Selisih hari check-in dari hari ini. -2 artinya check-in 2 hari lalu. */
  checkInOffsetDays: number;
  nights: number;
  checkInTime: string;
  checkOutTime: string;
  package: PackageName;
  addOns: string[];
  pickup: { type: "Jemput" | "Antar"; time: string; address: string; driver: string }[];
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: Species;
  breed: string;
  illustration: PetIllustration;
  ageLabel: string;
  room: string;
  /** Nama file di /public/cctv/. Kalau file belum ada, UI menampilkan placeholder. */
  cctvFile: string;
  sitterId: string;
  booking: Booking;
  healthCheck: HealthCheck;
  logs: DayLog[];
}

export type NotificationKind = "makan" | "main" | "kesehatan" | "info" | "foto";

export interface AppNotification {
  id: string;
  userId: string;
  petId?: string;
  kind: NotificationKind;
  title: string;
  body: string;
  /** Menit sebelum sekarang, biar mock selalu terasa baru. */
  minutesAgo: number;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  from: "sitter" | "user";
  text: string;
  time: string; // "HH:mm"
}
