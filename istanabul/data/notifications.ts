import type { AppNotification } from "@/types";

export const notifications: AppNotification[] = [
  {
    id: "n1",
    userId: "u-dinda",
    petId: "mochi",
    kind: "makan",
    title: "Mochi baru selesai makan siang, habis!",
    body: "Wet food tuna 40 g ludes. Sekarang lagi rebahan di bantal dekat jendela.",
    minutesAgo: 25,
    read: false,
  },
  {
    id: "n2",
    userId: "u-dinda",
    petId: "kopi",
    kind: "main",
    title: "Sesi main sore Kopi dimulai",
    body: "Kak Sekar ngajak Kopi main kejar bulu selama 20 menit.",
    minutesAgo: 70,
    read: false,
  },
  {
    id: "n3",
    userId: "u-dinda",
    petId: "mochi",
    kind: "foto",
    title: "Foto baru Mochi sudah masuk",
    body: "Ada 4 foto Mochi lagi disisir. Cek di laporan harian ya.",
    minutesAgo: 180,
    read: true,
  },
  {
    id: "n4",
    userId: "u-dinda",
    petId: "kopi",
    kind: "makan",
    title: "Sarapan Kopi sisa sedikit",
    body: "Kopi lagi kalem pagi ini. Makan siangnya nanti kami pantau lebih dekat.",
    minutesAgo: 410,
    read: true,
  },
  {
    id: "n5",
    userId: "u-dinda",
    kind: "info",
    title: "Jadwal antar sudah dikonfirmasi",
    body: "Pak Darto akan antar Mochi dan Kopi pulang jam 13:00 di hari check-out.",
    minutesAgo: 1440,
    read: true,
  },
  {
    id: "n6",
    userId: "u-raka",
    petId: "bruno",
    kind: "main",
    title: "Bruno lagi berenang!",
    body: "Sesi kolam renang 30 menit. Bruno semangat banget hari ini.",
    minutesAgo: 40,
    read: false,
  },
  {
    id: "n7",
    userId: "u-raka",
    petId: "bruno",
    kind: "kesehatan",
    title: "Cek harian Bruno: aman",
    body: "Berat 31,4 kg, nafsu makan normal. Sendi kaki belakang tetap oke.",
    minutesAgo: 300,
    read: true,
  },
];

export function notificationsForUser(userId: string) {
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => a.minutesAgo - b.minutesAgo);
}
