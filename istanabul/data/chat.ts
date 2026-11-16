import type { ChatMessage } from "@/types";

/** Pesan contoh di panel chat. `{name}` diganti nama anabul. */
export const chatSeed: ChatMessage[] = [
  {
    id: "c1",
    from: "sitter",
    text: "Halo kak! Aku yang jagain {name} hari ini. Kalau ada pertanyaan, tanya aja ya.",
    time: "08:02",
  },
  {
    id: "c2",
    from: "user",
    text: "Halo kak, semalam {name} tidurnya nyenyak nggak?",
    time: "08:10",
  },
  {
    id: "c3",
    from: "sitter",
    text: "Nyenyak banget kak, sempat bangun jam 5 minta dielus terus tidur lagi.",
    time: "08:12",
  },
  {
    id: "c4",
    from: "sitter",
    text: "Barusan makan siang juga udah habis. Nanti sore aku kabarin lagi pas sesi main.",
    time: "12:48",
  },
];

export const sitterAutoReplies = [
  "Siap kak, nanti aku sampaikan ke {name} ya.",
  "Noted kak! Aku cek {name} sekarang, nanti aku kabarin.",
  "Tenang aja kak, {name} aman sama kita.",
];
