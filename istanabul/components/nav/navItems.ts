import { Bell, Cctv, Home, UserRound, type LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  match: (path: string) => boolean;
}

export function getNavItems(firstPetId?: string): NavItem[] {
  return [
    { href: "/dashboard", label: "Beranda", icon: Home, match: (p) => p === "/dashboard" },
    {
      href: firstPetId ? `/anabul/${firstPetId}` : "/dashboard",
      label: "CCTV",
      icon: Cctv,
      match: (p) => p.startsWith("/anabul"),
    },
    { href: "/notifikasi", label: "Notifikasi", icon: Bell, match: (p) => p.startsWith("/notifikasi") },
    { href: "/profil", label: "Profil", icon: UserRound, match: (p) => p.startsWith("/profil") },
  ];
}
