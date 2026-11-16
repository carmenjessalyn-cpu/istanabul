import type { User } from "@/types";

/**
 * Akun demo. Password disimpan polos karena ini mock.
 * Jangan lakukan ini di aplikasi sungguhan.
 */
export const users: User[] = [
  {
    id: "u-dinda",
    name: "Dinda Prameswari",
    nickname: "Dinda",
    email: "dinda@istanabul.id",
    password: "meong123",
    phone: "0812-8834-2210",
    address: "Jl. Kemang Timur No. 18, Mampang Prapatan, Jakarta Selatan",
    memberSince: "2025-03-08",
    petIds: ["mochi", "kopi"],
  },
  {
    id: "u-raka",
    name: "Raka Aditya",
    nickname: "Raka",
    email: "raka@istanabul.id",
    password: "gukguk123",
    phone: "0857-1120-4478",
    address: "Apartemen Taman Rasuna Tower 9, Setiabudi, Jakarta Selatan",
    memberSince: "2026-01-21",
    petIds: ["bruno"],
  },
];

export function findUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email === normalized);
}

export function findUserById(id: string) {
  return users.find((u) => u.id === id);
}
