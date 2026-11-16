import type { AppNotification } from "@/types";

export const notifications: AppNotification[] = [
  {
    id: "n1",
    userId: "u-dinda",
    petId: "mochi",
    kind: "makan",
    title: "Mochi baru selesai makan siang, habis!",
    body: "Wet food ayam 50 g ludes. Sekarang lagi rebahan di kasur bulatnya dekat jendela.",
    minutesAgo: 25,
    read: false,
  },
  {
    id: "n2",
    userId: "u-dinda",
    petId: "kopi",
    kind: "main",
    title: "Sesi main sore Kopi dimulai",
    body: "Kak Yoga ngajak Kopi jalan santai di taman 15 menit, pas udaranya udah adem.",
    minutesAgo: 70,
    read: false,
  },
  {
    id: "n3",
    userId: "u-dinda",
    petId: "mochi",
    kind: "foto",
    title: "Foto baru Mochi sudah masuk",
    body: "Ada 4 foto Mochi abis disisir, bulunya makin mekar. Cek di laporan harian ya.",
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
    petId: "oyen",
    kind: "main",
    title: "Oyen lagi main laser!",
    body: "Sesi main 15 menit di kamar. Oyen semangat banget ngejar titik merahnya.",
    minutesAgo: 40,
    read: false,
  },
  {
    id: "n7",
    userId: "u-raka",
    petId: "oyen",
    kind: "kesehatan",
    title: "Cek harian Oyen: aman",
    body: "Berat 4,8 kg, nafsu makan normal. Porsi camilan tetap dibatasi sesuai saran dokter.",
    minutesAgo: 300,
    read: true,
  },
];

export function notificationsForUser(userId: string) {
  return notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => a.minutesAgo - b.minutesAgo);
}
