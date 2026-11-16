"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { Mascot, PetAvatar } from "./illustrations";
import { getNavItems } from "./nav/navItems";
import type { PetIllustration } from "@/types";

interface SidebarPet {
  id: string;
  name: string;
  room: string;
  illustration: PetIllustration;
}

export function Sidebar({
  userName,
  pets,
  unread,
}: {
  userName: string;
  pets: SidebarPet[];
  unread: number;
}) {
  const pathname = usePathname();
  const items = getNavItems(pets[0]?.id);

  return (
    <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r-4 border-plum bg-card px-5 py-6 lg:flex">
      <Link href="/dashboard" className="flex items-center gap-3 rounded-2xl">
        <Mascot className="h-12 w-12" title="Logo Istanabul" />
        <span>
          <span className="block font-display text-2xl font-bold leading-none text-plum">Istanabul</span>
          <span className="text-xs font-semibold text-ink">Istana Anabul · Jakarta</span>
        </span>
      </Link>

      <nav aria-label="Navigasi utama" className="mt-8">
        <ul className="space-y-1.5">
          {items.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center gap-3 rounded-2xl border-3 px-3.5 font-display font-semibold text-plum transition-colors duration-200 ${
                    active ? "border-plum bg-sun shadow-block-xs" : "border-transparent hover:bg-peach"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={2.4} />
                  <span className="flex-1">{item.label}</span>
                  {item.href === "/notifikasi" && unread > 0 && (
                    <span className="rounded-full border-2 border-plum bg-coral px-2 text-xs font-bold text-plum">
                      {unread}
                      <span className="sr-only"> belum dibaca</span>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8">
        <p className="px-1 font-display text-xs font-semibold uppercase tracking-wider text-ink">Lagi dititip</p>
        <ul className="mt-2 space-y-1">
          {pets.map((p) => {
            const active = pathname === `/anabul/${p.id}`;
            return (
              <li key={p.id}>
                <Link
                  href={`/anabul/${p.id}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center gap-3 rounded-2xl px-2 py-1.5 hover:bg-peach ${active ? "bg-peach" : ""}`}
                >
                  <span className="h-9 w-9 overflow-hidden rounded-full border-2 border-plum">
                    <PetAvatar kind={p.illustration} className="h-full w-full" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-semibold leading-tight text-plum">{p.name}</span>
                    <span className="block text-xs text-ink">{p.room}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto rounded-3xl border-3 border-plum bg-peach p-4">
        <p className="text-sm text-ink">Masuk sebagai</p>
        <p className="font-display text-lg font-semibold text-plum">{userName}</p>
        <form action={logoutAction} className="mt-3">
          <button type="submit" className="btn-secondary w-full text-sm">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
