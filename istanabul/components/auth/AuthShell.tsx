import Link from "next/link";
import { Mascot } from "@/components/illustrations";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10">
      <section className="hidden lg:block" aria-hidden="true">
        <div className="relative">
          <div className="card relative overflow-hidden bg-peach p-10">
            <Mascot className="h-40 w-40" />
            <p className="mt-6 font-display text-4xl font-semibold leading-tight text-plum">
              Anabul kamu lagi
              <br />
              <span className="text-coral-text">dimanja</span> di istana.
            </p>
            <p className="mt-4 max-w-sm text-lg text-ink">
              Cek CCTV kamarnya, jadwal makan, sampai sesi main hari ini. Semua dari satu tempat, kapan aja kamu kangen.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              <li className="chip bg-mint">CCTV 24 jam</li>
              <li className="chip bg-sun">Laporan makan</li>
              <li className="chip bg-lilac">Chat pet sitter</li>
            </ul>
          </div>
          <div className="card absolute -bottom-6 right-8 flex items-center gap-3 bg-card px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-mint-deep" />
            <span className="font-display font-semibold text-plum">Mochi baru habisin makan siang</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-md">
        <Link href="/login" className="mb-6 inline-flex items-center gap-3 rounded-2xl lg:mb-8">
          <Mascot className="h-14 w-14" title="Logo Istanabul" />
          <span>
            <span className="block font-display text-2xl font-bold leading-none text-plum">Istanabul</span>
            <span className="text-sm font-semibold text-ink">Istana Anabul · Jakarta</span>
          </span>
        </Link>
        <div className="card animate-fade-up p-5 sm:p-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="mt-1.5 text-ink">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </section>
    </main>
  );
}
