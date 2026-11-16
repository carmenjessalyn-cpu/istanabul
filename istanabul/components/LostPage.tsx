import Link from "next/link";
import { Home } from "lucide-react";
import { LostPet } from "./illustrations";

export function LostPage({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-10 text-center animate-fade-up">
      <p className="font-display text-7xl font-bold leading-none text-coral-text sm:text-8xl">404</p>
      <LostPet className="mt-4 h-auto w-64 sm:w-72" title="Kucing kebingungan di depan papan penunjuk arah" />
      <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">{title}</h1>
      <p className="mt-2 text-lg text-ink">{message}</p>
      <Link href="/dashboard" className="btn-primary mt-6">
        <Home className="h-5 w-5" aria-hidden="true" />
        Antar pulang ke beranda
      </Link>
    </div>
  );
}
