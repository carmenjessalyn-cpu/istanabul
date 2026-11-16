import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, LogOut, Mail, MapPin, Phone, CalendarHeart, Headset } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import { Mascot, PetAvatar } from "@/components/illustrations";
import { petsByOwner } from "@/data/pets";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_LABEL } from "@/data/sitters";
import { requireUser } from "@/lib/auth";
import { formatTanggalIso } from "@/lib/time";

export const metadata: Metadata = { title: "Profil" };

export default async function ProfilPage() {
  const user = await requireUser();
  const pets = petsByOwner(user.id);
  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const rows = [
    { Icon: Mail, label: "Email", value: user.email },
    { Icon: Phone, label: "No. HP", value: user.phone },
    { Icon: MapPin, label: "Alamat antar-jemput", value: user.address },
    { Icon: CalendarHeart, label: "Pawrent sejak", value: formatTanggalIso(user.memberSince) },
  ];

  return (
    <div className="mx-auto max-w-4xl animate-fade-up">
      <h1 className="sr-only">Profil</h1>
      <section className="card overflow-hidden">
        <div className="relative border-b-3 border-plum bg-peach px-5 pb-5 pt-6 md:border-b-4">
          <Mascot className="absolute -right-2 -top-1 h-24 w-24 opacity-90 sm:h-28 sm:w-28" title="" />
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-plum bg-sun font-display text-3xl font-bold text-plum">
              {initials}
            </span>
            <div className="min-w-0 pr-20">
              <p className="font-display text-2xl font-semibold leading-tight text-plum sm:text-3xl">{user.name}</p>
              <p className="mt-1 text-ink">
                Pawrent {pets.map((p) => p.name).join(" & ")}
              </p>
            </div>
          </div>
        </div>
        <dl className="divide-y-2 divide-plum/15">
          {rows.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 px-5 py-3.5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-plum" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-xs font-bold text-ink">{label}</dt>
                <dd className="break-words font-semibold text-plum">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="anabulku">
          <h2 id="anabulku" className="text-xl font-semibold">
            Anabul kamu
          </h2>
          <ul className="mt-3 space-y-3">
            {pets.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/anabul/${p.id}`}
                  className="flex min-h-[64px] items-center gap-3 rounded-3xl border-3 border-plum bg-card p-3 transition-colors duration-200 hover:bg-peach"
                >
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-3 border-plum">
                    <PetAvatar kind={p.illustration} className="h-full w-full" title={`Ilustrasi ${p.name}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold text-plum">{p.name}</span>
                    <span className="block text-sm text-ink">
                      {p.breed} · {p.ageLabel}
                    </span>
                  </span>
                  <ChevronRight className="h-5 w-5 text-plum" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="bantuan" className="rounded-3xl border-3 border-plum bg-lilac p-4">
          <h2 id="bantuan" className="flex items-center gap-2 text-xl font-semibold">
            <Headset className="h-5 w-5" aria-hidden="true" /> Butuh bantuan?
          </h2>
          <p className="mt-1 text-plum-2">Tim Istanabul standby 24 jam di Jl. Wijaya I No. 27, Kebayoran Baru.</p>
          <a href={`tel:${EMERGENCY_PHONE}`} className="btn-secondary mt-4 w-full">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {EMERGENCY_PHONE_LABEL}
          </a>
          <form action={logoutAction} className="mt-3">
            <button type="submit" className="btn-primary w-full">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Keluar dari akun
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
