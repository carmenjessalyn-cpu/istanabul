import type { Pet } from "@/types";

/**
 * Mock data anabul yang sedang dititip.
 *
 * Tanggal booking dihitung relatif dari hari ini (lihat `checkInOffsetDays`)
 * supaya demo selalu terasa "sedang berlangsung". Log hari terakhir dianggap
 * log hari ini; jadwal yang jamnya belum lewat otomatis tampil "Terjadwal".
 *
 * Ganti video CCTV: taruh file .mp4 di /public/cctv/ lalu sesuaikan `cctvFile`.
 */
export const pets: Pet[] = [
  {
    id: "mochi",
    ownerId: "u-dinda",
    name: "Mochi",
    species: "anjing",
    breed: "Poodle Putih",
    illustration: "poodle",
    ageLabel: "3 tahun",
    room: "Kamar 07",
    cctvFile: "video-mochi.mp4",
    sitterId: "s-yoga",
    booking: {
      code: "IST-2611-0417",
      checkInOffsetDays: -2,
      nights: 5,
      checkInTime: "10:00",
      checkOutTime: "12:00",
      package: "Nyaman Pol",
      addOns: ["Grooming mandi + potong bulu", "Laporan foto harian"],
      pickup: [
        {
          type: "Jemput",
          time: "09:15",
          address: "Jl. Kemang Timur No. 18",
          driver: "Pak Darto",
        },
        {
          type: "Antar",
          time: "13:00",
          address: "Jl. Kemang Timur No. 18",
          driver: "Pak Darto",
        },
      ],
    },
    healthCheck: {
      temperatureC: 38.6,
      weightKg: 3.6,
      coatSkin: "Bulu keriting lebat dan bersih, sedikit kusut di belakang telinga. Kulit sehat, tanpa kutu.",
      vetName: "drh. Laras Wibowo",
      vetNote:
        "Kondisi umum sehat. Ada noda air mata tipis di bawah mata, wajar untuk poodle putih. Dibersihkan 2x sehari pakai kapas hangat.",
    },
    logs: [
      {
        day: 1,
        condition: {
          mood: "Agak manja",
          appetite: "Pilih-pilih",
          weightKg: 3.6,
          sitterNote:
            "Hari pertama Mochi masih nempel terus ke kaki sitter dan sesekali nyari pintu. Sore udah mau main bola. Wajar kok, besok pasti lebih santai.",
        },
        feedings: [
          { time: "12:30", menu: "Wet food ayam (bawaan rumah)", portion: "50 g", result: "sisa-sedikit" },
          { time: "18:00", menu: "Dry food Royal Canin Poodle", portion: "40 g", result: "sisa-sedikit" },
          { time: "21:00", menu: "Camilan biskuit anjing", portion: "2 keping", result: "habis" },
        ],
        plays: [
          { time: "16:00", durationMin: 15, activity: "Kenalan sama taman" },
          { time: "19:30", durationMin: 15, activity: "Main bola kecil", note: "Mulai mau ngejar bola" },
        ],
      },
      {
        day: 2,
        condition: {
          mood: "Santai",
          appetite: "Normal",
          weightKg: 3.6,
          sitterNote:
            "Mochi udah betah. Tidur siang di kasur bulatnya dekat jendela, terus sore minta digaruk perut sampai guling-guling.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Royal Canin Poodle", portion: "40 g", result: "habis" },
          { time: "12:30", menu: "Wet food ayam (bawaan rumah)", portion: "50 g", result: "habis" },
          { time: "18:00", menu: "Dry food Royal Canin Poodle", portion: "40 g", result: "habis" },
          { time: "21:00", menu: "Camilan biskuit anjing", portion: "2 keping", result: "habis" },
        ],
        plays: [
          { time: "08:00", durationMin: 20, activity: "Jalan-jalan pagi" },
          { time: "15:00", durationMin: 20, activity: "Main tarik tali" },
          { time: "19:30", durationMin: 15, activity: "Sesi sisir bulu", note: "Mochi diem anteng" },
        ],
      },
      {
        day: 3,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 3.6,
          sitterNote:
            "Mochi lagi happy banget hari ini. Makan siang habis tanpa sisa, terus langsung lari-lari kecil minta diajak main. Tenang aja ya, kak.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Royal Canin Poodle", portion: "40 g", result: "habis" },
          { time: "12:30", menu: "Wet food ayam (bawaan rumah)", portion: "50 g", result: "habis" },
          { time: "18:00", menu: "Dry food Royal Canin Poodle", portion: "40 g", result: "habis" },
          { time: "21:00", menu: "Camilan biskuit anjing", portion: "2 keping", result: "habis" },
        ],
        plays: [
          { time: "08:00", durationMin: 20, activity: "Jalan-jalan pagi" },
          { time: "13:30", durationMin: 15, activity: "Main bola kecil" },
          { time: "16:30", durationMin: 25, activity: "Jalan-jalan sore" },
          { time: "19:30", durationMin: 15, activity: "Sesi sisir bulu" },
        ],
      },
    ],
  },
  {
    id: "kopi",
    ownerId: "u-dinda",
    name: "Kopi",
    species: "anjing",
    breed: "Pug",
    illustration: "pug",
    ageLabel: "2 tahun",
    room: "Kamar 08",
    cctvFile: "kamar-08.mp4",
    sitterId: "s-yoga",
    booking: {
      code: "IST-2611-0418",
      checkInOffsetDays: -2,
      nights: 4,
      checkInTime: "10:00",
      checkOutTime: "12:00",
      package: "Meong Hemat",
      addOns: ["Laporan foto harian"],
      pickup: [
        {
          type: "Jemput",
          time: "09:15",
          address: "Jl. Kemang Timur No. 18",
          driver: "Pak Darto",
        },
        {
          type: "Antar",
          time: "13:00",
          address: "Jl. Kemang Timur No. 18",
          driver: "Pak Darto",
        },
      ],
    },
    healthCheck: {
      temperatureC: 38.5,
      weightKg: 7.4,
      coatSkin: "Bulu pendek mengilap, rontok normal. Lipatan wajah bersih, sedikit kemerahan di lipatan atas hidung.",
      vetName: "drh. Laras Wibowo",
      vetNote:
        "Sehat. Napas agak ngorok, khas pug. Aktivitas dibatasi saat siang yang panas, lipatan wajah dibersihkan dan dikeringkan tiap hari.",
    },
    logs: [
      {
        day: 1,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 7.4,
          sitterNote: "Kopi langsung PD dari jam pertama. Kepo sama semua sudut kamar, terus ngikutin sitter ke mana-mana.",
        },
        feedings: [
          { time: "12:30", menu: "Dry food Royal Canin Pug", portion: "60 g", result: "habis" },
          { time: "18:00", menu: "Dry food Royal Canin Pug", portion: "60 g", result: "habis" },
        ],
        plays: [
          { time: "16:30", durationMin: 15, activity: "Jalan santai di taman" },
          { time: "19:00", durationMin: 10, activity: "Main mainan bunyi" },
        ],
      },
      {
        day: 2,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 7.4,
          sitterNote: "Energinya banyak, tapi kami tetap atur biar nggak kecapekan. Habis main langsung tidur sambil ngorok kenceng.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Royal Canin Pug", portion: "60 g", result: "habis" },
          { time: "12:30", menu: "Camilan dental stick", portion: "1 batang", result: "habis" },
          { time: "18:00", menu: "Dry food Royal Canin Pug", portion: "60 g", result: "sisa-sedikit" },
        ],
        plays: [
          { time: "07:00", durationMin: 15, activity: "Jalan santai pagi" },
          { time: "14:00", durationMin: 10, activity: "Main mainan bunyi", note: "Di ruang ber-AC" },
          { time: "17:00", durationMin: 15, activity: "Jalan-jalan sore" },
        ],
      },
      {
        day: 3,
        condition: {
          mood: "Santai",
          appetite: "Normal",
          weightKg: 7.4,
          sitterNote:
            "Hari ini Kopi lebih kalem, banyak rebahan di lantai yang adem. Sarapan agak disisain, tapi camilan siang habis.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Royal Canin Pug", portion: "60 g", result: "sisa-sedikit" },
          { time: "12:30", menu: "Camilan dental stick", portion: "1 batang", result: "habis" },
          { time: "18:00", menu: "Dry food Royal Canin Pug", portion: "60 g", result: "habis" },
        ],
        plays: [
          { time: "07:00", durationMin: 15, activity: "Jalan santai pagi" },
          { time: "14:00", durationMin: 10, activity: "Main mainan bunyi" },
          { time: "17:00", durationMin: 15, activity: "Jalan-jalan sore" },
        ],
      },
    ],
  },
  {
    id: "oyen",
    ownerId: "u-raka",
    name: "Oyen",
    species: "kucing",
    breed: "Kucing Domestik Oranye",
    illustration: "oyen",
    ageLabel: "2 tahun",
    room: "Kamar 12",
    cctvFile: "kamar-12.mp4",
    sitterId: "s-sekar",
    booking: {
      code: "IST-2611-0422",
      checkInOffsetDays: -2,
      nights: 6,
      checkInTime: "09:00",
      checkOutTime: "12:00",
      package: "Sultan Anabul",
      addOns: ["Catio pribadi", "Grooming lengkap", "Video call harian", "Laporan foto harian"],
      pickup: [
        {
          type: "Jemput",
          time: "08:00",
          address: "Apartemen Taman Rasuna, lobi Tower 9",
          driver: "Pak Ujang",
        },
        {
          type: "Antar",
          time: "13:30",
          address: "Apartemen Taman Rasuna, lobi Tower 9",
          driver: "Pak Ujang",
        },
      ],
    },
    healthCheck: {
      temperatureC: 38.6,
      weightKg: 4.8,
      coatSkin: "Bulu pendek oranye mengilap, kulit bersih. Kuku agak panjang, sudah dipotong saat check-in.",
      vetName: "drh. Bayu Nugroho",
      vetNote:
        "Sehat dan aktif. Berat sedikit di atas ideal, porsi camilan dibatasi 1x sehari. Vaksin lengkap sesuai buku.",
    },
    logs: [
      {
        day: 1,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 4.8,
          sitterNote: "Oyen langsung jalan-jalan keliling kamar kayak bos. Belum sejam udah minta makan, khas oyen banget.",
        },
        feedings: [
          { time: "12:00", menu: "Dry food Royal Canin Indoor", portion: "25 g", result: "habis" },
          { time: "18:30", menu: "Wet food tuna", portion: "1 pouch", result: "habis" },
        ],
        plays: [
          { time: "10:30", durationMin: 15, activity: "Kenalan sama catio" },
          { time: "16:30", durationMin: 20, activity: "Kejar bulu" },
        ],
      },
      {
        day: 2,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 4.8,
          sitterNote: "Pertama kali coba mainan catnip, Oyen langsung guling-guling. Abis itu tidur pulas di hammock sampai sore.",
        },
        feedings: [
          { time: "07:00", menu: "Dry food Royal Canin Indoor", portion: "25 g", result: "habis" },
          { time: "12:00", menu: "Camilan creamy treat", portion: "1 sachet", result: "habis" },
          { time: "18:30", menu: "Wet food tuna", portion: "1 pouch", result: "habis" },
        ],
        plays: [
          { time: "08:00", durationMin: 15, activity: "Main laser" },
          { time: "10:30", durationMin: 20, activity: "Main mainan catnip", note: "Seru banget" },
          { time: "16:30", durationMin: 20, activity: "Kejar bulu" },
        ],
      },
      {
        day: 3,
        condition: {
          mood: "Agak manja",
          appetite: "Normal",
          weightKg: 4.8,
          sitterNote:
            "Pagi ini Oyen agak manja, ngeong terus minta dipangku. Kayaknya kangen kak Raka. Abis dielus dan main laser, moodnya balik lagi.",
        },
        feedings: [
          { time: "07:00", menu: "Dry food Royal Canin Indoor", portion: "25 g", result: "habis" },
          { time: "12:00", menu: "Camilan creamy treat", portion: "1 sachet", result: "sisa-sedikit" },
          { time: "18:30", menu: "Wet food tuna", portion: "1 pouch", result: "habis" },
        ],
        plays: [
          { time: "08:00", durationMin: 15, activity: "Main laser" },
          { time: "10:30", durationMin: 20, activity: "Main bola kerincing" },
          { time: "14:30", durationMin: 15, activity: "Berjemur di catio" },
          { time: "16:30", durationMin: 20, activity: "Kejar bulu" },
        ],
      },
    ],
  },
];

export function findPet(id: string) {
  return pets.find((p) => p.id === id);
}

export function petsByOwner(ownerId: string) {
  return pets.filter((p) => p.ownerId === ownerId);
}
