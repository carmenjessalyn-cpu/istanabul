import { ArrowDownRight, ArrowUpRight, Car, Crown, Sparkles } from "lucide-react";
import type { Booking } from "@/types";

const PACKAGE_STYLE: Record<Booking["package"], { bg: string; desc: string }> = {
  "Meong Hemat": { bg: "bg-mint", desc: "Kamar standar, makan 3x, main 2 sesi" },
  "Nyaman Pol": { bg: "bg-sun", desc: "Kamar luas, makan 4x, main 4 sesi, CCTV 24 jam" },
  "Sultan Anabul": { bg: "bg-lilac", desc: "Suite pribadi, sitter khusus, kolam & taman" },
};

export function BookingInfo({
  booking,
  checkInLabel,
  checkOutLabel,
}: {
  booking: Booking;
  checkInLabel: string;
  checkOutLabel: string;
}) {
  const pkg = PACKAGE_STYLE[booking.package];
  return (
    <section className="card p-4 sm:p-5" aria-labelledby="booking-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="booking-heading" className="text-xl font-semibold">
          Info booking
        </h2>
        <span className="text-sm font-semibold text-ink">
          Kode <span className="font-display text-plum">{booking.code}</span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border-3 border-plum">
        <div className="border-r-3 border-plum bg-cream p-3">
          <p className="flex items-center gap-1 text-xs font-bold text-ink">
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" /> Check-in
          </p>
          <p className="mt-1 font-display text-lg font-semibold leading-tight text-plum">{checkInLabel}</p>
          <p className="text-sm text-ink">{booking.checkInTime} WIB</p>
        </div>
        <div className="bg-cream p-3">
          <p className="flex items-center gap-1 text-xs font-bold text-ink">
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /> Check-out
          </p>
          <p className="mt-1 font-display text-lg font-semibold leading-tight text-plum">{checkOutLabel}</p>
          <p className="text-sm text-ink">{booking.checkOutTime} WIB</p>
        </div>
      </div>

      <div className={`mt-4 flex items-start gap-3 rounded-2xl border-3 border-plum p-3 ${pkg.bg}`}>
        <Crown className="mt-0.5 h-5 w-5 shrink-0 text-plum" aria-hidden="true" />
        <div>
          <p className="font-display text-lg font-semibold text-plum">Paket {booking.package}</p>
          <p className="text-sm text-plum-2">{pkg.desc}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="flex items-center gap-1.5 font-display font-semibold text-plum">
          <Sparkles className="h-4 w-4" aria-hidden="true" /> Layanan tambahan
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {booking.addOns.map((a) => (
            <li key={a} className="chip bg-peach">
              {a}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="flex items-center gap-1.5 font-display font-semibold text-plum">
          <Car className="h-4 w-4" aria-hidden="true" /> Antar-jemput
        </p>
        <ul className="mt-2 space-y-2">
          {booking.pickup.map((p) => (
            <li key={p.type} className="flex items-start gap-3 rounded-2xl bg-cream p-3">
              <span className={`chip shrink-0 ${p.type === "Jemput" ? "bg-mint" : "bg-sun"}`}>{p.type}</span>
              <span className="min-w-0 text-sm text-ink">
                <span className="font-bold text-plum">
                  {p.type === "Jemput" ? checkInLabel : checkOutLabel}, {p.time} WIB
                </span>
                <br />
                {p.address} · Driver {p.driver}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
