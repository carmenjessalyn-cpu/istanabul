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
    species: "kucing",
    breed: "Kucing Persia",
    illustration: "persia",
    ageLabel: "3 tahun",
    room: "Kamar 07",
    cctvFile: "kamar-07.mp4",
    sitterId: "s-sekar",
    booking: {
      code: "IST-2611-0417",
      checkInOffsetDays: -2,
      nights: 5,
      checkInTime: "10:00",
      checkOutTime: "12:00",
      package: "Nyaman Pol",
      addOns: ["Grooming mandi + sisir", "Laporan foto harian"],
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
      temperatureC: 38.4,
      weightKg: 4.2,
      coatSkin: "Bulu lebat dan bersih, sedikit kusut di bagian perut. Kulit sehat, tanpa kutu.",
      vetName: "drh. Laras Wibowo",
      vetNote:
        "Kondisi umum sehat. Mata agak berair, wajar untuk Persia. Dibersihkan 2x sehari pakai kapas hangat.",
    },
    logs: [
      {
        day: 1,
        condition: {
          mood: "Agak manja",
          appetite: "Pilih-pilih",
          weightKg: 4.2,
          sitterNote:
            "Hari pertama Mochi masih malu-malu, banyak ngumpet di kardus. Sore udah mau dielus. Wajar kok, besok pasti lebih santai.",
        },
        feedings: [
          { time: "12:30", menu: "Wet food tuna (bawaan rumah)", portion: "40 g", result: "sisa-sedikit" },
          { time: "18:00", menu: "Dry food Royal Canin Persian", portion: "25 g", result: "sisa-sedikit" },
          { time: "21:00", menu: "Camilan creamy treat", portion: "1 sachet", result: "habis" },
        ],
        plays: [
          { time: "16:00", durationMin: 10, activity: "Kenalan sama ruangan" },
          { time: "19:30", durationMin: 15, activity: "Kejar bulu", note: "Mulai mau ikut main" },
        ],
      },
      {
        day: 2,
        condition: {
          mood: "Santai",
          appetite: "Normal",
          weightKg: 4.2,
          sitterNote:
            "Mochi udah betah. Tidur siang di bantal favoritnya dekat jendela, terus sore minta dielus sampai mendengkur.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Royal Canin Persian", portion: "25 g", result: "habis" },
          { time: "12:30", menu: "Wet food tuna (bawaan rumah)", portion: "40 g", result: "habis" },
          { time: "18:00", menu: "Dry food Royal Canin Persian", portion: "25 g", result: "habis" },
          { time: "21:00", menu: "Camilan creamy treat", portion: "1 sachet", result: "habis" },
        ],
        plays: [
          { time: "09:30", durationMin: 15, activity: "Kejar bulu" },
          { time: "15:00", durationMin: 20, activity: "Main bola kerincing" },
          { time: "19:30", durationMin: 15, activity: "Sesi sisir bulu", note: "Mochi suka banget" },
        ],
      },
      {
        day: 3,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 4.3,
          sitterNote:
            "Mochi lagi happy banget hari ini. Makan siang habis tanpa sisa, terus langsung guling-guling minta perhatian. Tenang aja ya, kak.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Royal Canin Persian", portion: "25 g", result: "habis" },
          { time: "12:30", menu: "Wet food tuna (bawaan rumah)", portion: "40 g", result: "habis" },
          { time: "18:00", menu: "Dry food Royal Canin Persian", portion: "25 g", result: "habis" },
          { time: "21:00", menu: "Camilan creamy treat", portion: "1 sachet", result: "habis" },
        ],
        plays: [
          { time: "09:30", durationMin: 20, activity: "Kejar bulu" },
          { time: "13:30", durationMin: 15, activity: "Main bola kerincing" },
          { time: "16:30", durationMin: 20, activity: "Main terowongan kain" },
          { time: "19:30", durationMin: 15, activity: "Sesi sisir bulu" },
        ],
      },
    ],
  },
  {
    id: "kopi",
    ownerId: "u-dinda",
    name: "Kopi",
    species: "kucing",
    breed: "Kucing Domestik",
    illustration: "domestik",
    ageLabel: "1,5 tahun",
    room: "Kamar 08",
    cctvFile: "kamar-08.mp4",
    sitterId: "s-sekar",
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
      temperatureC: 38.6,
      weightKg: 3.8,
      coatSkin: "Bulu pendek mengilap, kulit bersih. Ada bekas cakaran kecil di telinga kiri, sudah kering.",
      vetName: "drh. Laras Wibowo",
      vetNote: "Sehat dan aktif. Vaksin lengkap sesuai buku. Tidak perlu perawatan khusus.",
    },
    logs: [
      {
        day: 1,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 3.8,
          sitterNote: "Kopi langsung PD dari jam pertama. Kepo sama semua sudut kamar, terus nyari teman main.",
        },
        feedings: [
          { time: "12:30", menu: "Dry food Whiskas ikan", portion: "30 g", result: "habis" },
          { time: "18:00", menu: "Wet food ayam", portion: "1 pouch", result: "habis" },
        ],
        plays: [
          { time: "14:00", durationMin: 20, activity: "Kejar bulu" },
          { time: "17:00", durationMin: 25, activity: "Main laser" },
        ],
      },
      {
        day: 2,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 3.8,
          sitterNote: "Energinya banyak banget. Habis main laser langsung tidur nyenyak sampai sore.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Whiskas ikan", portion: "30 g", result: "habis" },
          { time: "12:30", menu: "Wet food ayam", portion: "1 pouch", result: "habis" },
          { time: "18:00", menu: "Dry food Whiskas ikan", portion: "30 g", result: "sisa-sedikit" },
        ],
        plays: [
          { time: "09:00", durationMin: 25, activity: "Main laser" },
          { time: "15:00", durationMin: 20, activity: "Kejar bulu" },
          { time: "20:00", durationMin: 15, activity: "Main bola kertas" },
        ],
      },
      {
        day: 3,
        condition: {
          mood: "Santai",
          appetite: "Normal",
          weightKg: 3.8,
          sitterNote: "Hari ini Kopi lebih kalem, banyak rebahan di rak paling atas. Sarapan agak disisain, tapi makan siang aman.",
        },
        feedings: [
          { time: "07:30", menu: "Dry food Whiskas ikan", portion: "30 g", result: "sisa-sedikit" },
          { time: "12:30", menu: "Wet food ayam", portion: "1 pouch", result: "habis" },
          { time: "18:00", menu: "Dry food Whiskas ikan", portion: "30 g", result: "habis" },
        ],
        plays: [
          { time: "09:00", durationMin: 20, activity: "Main laser" },
          { time: "15:30", durationMin: 20, activity: "Kejar bulu" },
          { time: "20:00", durationMin: 15, activity: "Main bola kertas" },
        ],
      },
    ],
  },
  {
    id: "bruno",
    ownerId: "u-raka",
    name: "Bruno",
    species: "anjing",
    breed: "Golden Retriever",
    illustration: "golden",
    ageLabel: "4 tahun",
    room: "Kamar 12",
    cctvFile: "kamar-12.mp4",
    sitterId: "s-yoga",
    booking: {
      code: "IST-2611-0422",
      checkInOffsetDays: -2,
      nights: 6,
      checkInTime: "09:00",
      checkOutTime: "12:00",
      package: "Sultan Anabul",
      addOns: ["Kolam renang anjing", "Grooming lengkap", "Video call harian", "Laporan foto harian"],
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
      temperatureC: 38.7,
      weightKg: 31.5,
      coatSkin: "Bulu tebal, sedang rontok musiman. Kulit sehat, telinga bersih.",
      vetName: "drh. Bayu Nugroho",
      vetNote:
        "Sehat dan semangat. Sendi kaki belakang aman. Disarankan jalan santai, hindari lari di lantai licin.",
    },
    logs: [
      {
        day: 1,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 31.5,
          sitterNote: "Bruno langsung akrab sama semua orang. Ekornya nggak berhenti goyang dari pagi.",
        },
        feedings: [
          { time: "12:00", menu: "Dry food Pro Plan Large Breed", portion: "200 g", result: "habis" },
          { time: "18:30", menu: "Dry food + topping dada ayam rebus", portion: "200 g", result: "habis" },
        ],
        plays: [
          { time: "10:30", durationMin: 30, activity: "Kenalan di taman" },
          { time: "16:30", durationMin: 40, activity: "Jalan-jalan sore" },
        ],
      },
      {
        day: 2,
        condition: {
          mood: "Ceria",
          appetite: "Lahap",
          weightKg: 31.4,
          sitterNote: "Pertama kali coba kolam renang, Bruno malah nggak mau naik. Abis itu tidur pulas sampai makan malam.",
        },
        feedings: [
          { time: "07:00", menu: "Dry food Pro Plan Large Breed", portion: "200 g", result: "habis" },
          { time: "12:00", menu: "Camilan dental stick", portion: "1 batang", result: "habis" },
          { time: "18:30", menu: "Dry food + topping dada ayam rebus", portion: "200 g", result: "habis" },
        ],
        plays: [
          { time: "07:45", durationMin: 30, activity: "Jalan-jalan pagi" },
          { time: "10:30", durationMin: 30, activity: "Berenang di kolam", note: "Seru banget" },
          { time: "16:30", durationMin: 40, activity: "Jalan-jalan sore" },
        ],
      },
      {
        day: 3,
        condition: {
          mood: "Agak manja",
          appetite: "Normal",
          weightKg: 31.4,
          sitterNote:
            "Pagi ini Bruno agak manja, nyender terus ke kaki. Kayaknya kangen kak Raka. Abis dielus dan main bola, moodnya balik lagi.",
        },
        feedings: [
          { time: "07:00", menu: "Dry food Pro Plan Large Breed", portion: "200 g", result: "habis" },
          { time: "12:00", menu: "Camilan dental stick", portion: "1 batang", result: "sisa-sedikit" },
          { time: "18:30", menu: "Dry food + topping dada ayam rebus", portion: "200 g", result: "habis" },
        ],
        plays: [
          { time: "07:45", durationMin: 30, activity: "Jalan-jalan pagi" },
          { time: "10:30", durationMin: 25, activity: "Main bola" },
          { time: "14:30", durationMin: 30, activity: "Berenang di kolam" },
          { time: "16:30", durationMin: 40, activity: "Jalan-jalan sore" },
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
