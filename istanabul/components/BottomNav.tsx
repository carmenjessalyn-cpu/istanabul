"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItems } from "./nav/navItems";

export function BottomNav({ firstPetId, unread }: { firstPetId?: string; unread: number }) {
  const pathname = usePathname();
  const items = getNavItems(firstPetId);

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t-3 border-plum bg-card pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="group flex min-h-[64px] flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-2"
              >
                <span
                  className={`relative flex h-9 w-14 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    active ? "border-plum bg-sun" : "border-transparent group-hover:bg-peach"
                  }`}
                >
                  <Icon className="h-5 w-5 text-plum" aria-hidden="true" strokeWidth={2.4} />
                  {item.href === "/notifikasi" && unread > 0 && (
                    <span className="absolute -right-0.5 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-plum bg-coral px-1 font-display text-[11px] font-bold leading-none text-plum">
                      {unread}
                      <span className="sr-only"> belum dibaca</span>
                    </span>
                  )}
                </span>
                <span className={`font-display text-xs ${active ? "font-bold text-plum" : "font-medium text-ink"}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
