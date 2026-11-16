import type { Sitter } from "@/types";

export const sitters: Sitter[] = [
  {
    id: "s-sekar",
    name: "Kak Sekar",
    role: "Pet sitter kucing",
    avatar: "sitter-a",
    phone: "0811-1900-707",
  },
  {
    id: "s-yoga",
    name: "Kak Yoga",
    role: "Pet sitter anjing",
    avatar: "sitter-b",
    phone: "0811-1900-808",
  },
];

export const EMERGENCY_PHONE = "+6281119000911";
export const EMERGENCY_PHONE_LABEL = "0811-1900-0911";

export function findSitter(id: string) {
  return sitters.find((s) => s.id === id);
}
