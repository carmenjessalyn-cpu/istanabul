import { Scale, Stethoscope, Thermometer } from "lucide-react";
import type { HealthCheck, Species } from "@/types";

const NORMAL_TEMP: Record<Species, [number, number]> = {
  kucing: [38.0, 39.2],
  anjing: [38.3, 39.2],
};

const fmt = (n: number) => n.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function HealthCheckCard({
  check,
  species,
  dateLabel,
}: {
  check: HealthCheck;
  species: Species;
  dateLabel: string;
}) {
  const [lo, hi] = NORMAL_TEMP[species];
  const normal = check.temperatureC >= lo && check.temperatureC <= hi;

  return (
    <section className="card overflow-hidden" aria-labelledby="sehat-heading">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-3 border-plum bg-mint px-4 py-3 sm:px-5">
        <h2 id="sehat-heading" className="text-xl font-semibold">
          Cek kesehatan saat check-in
        </h2>
        <span className="text-sm font-semibold text-plum-2">{dateLabel}</span>
      </div>
      <div className="p-4 sm:p-5">
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-cream p-3">
            <dt className="flex items-center gap-1.5 text-xs font-bold text-ink">
              <Thermometer className="h-4 w-4" aria-hidden="true" /> Suhu tubuh
            </dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-plum">{fmt(check.temperatureC)}°C</dd>
            <dd className="text-xs font-semibold text-ink">
              {normal ? "Normal" : "Perlu dipantau"} ({fmt(lo)}–{fmt(hi)}°C)
            </dd>
          </div>
          <div className="rounded-2xl bg-cream p-3">
            <dt className="flex items-center gap-1.5 text-xs font-bold text-ink">
              <Scale className="h-4 w-4" aria-hidden="true" /> Berat badan
            </dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-plum">{fmt(check.weightKg)} kg</dd>
            <dd className="text-xs font-semibold text-ink">Ditimbang saat datang</dd>
          </div>
          <div className="col-span-2 rounded-2xl bg-cream p-3">
            <dt className="text-xs font-bold text-ink">Kondisi bulu & kulit</dt>
            <dd className="mt-1 text-plum-2">{check.coatSkin}</dd>
          </div>
        </dl>

        <div className="mt-3 flex items-start gap-3 rounded-2xl border-3 border-plum p-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-3 border-plum bg-lilac">
            <Stethoscope className="h-5 w-5 text-plum" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display font-semibold text-plum">Catatan {check.vetName}</p>
            <p className="mt-0.5 text-plum-2">{check.vetNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
