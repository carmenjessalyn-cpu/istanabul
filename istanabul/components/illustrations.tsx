import type { PetIllustration } from "@/types";

const PLUM = "#2E2240";

type SvgProps = { className?: string; title?: string };

function a11y(title?: string) {
  return title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
}

function A11y({ title }: { title?: string }) {
  return title ? <title>{title}</title> : null;
}

/** Maskot Istanabul: kucing oranye bermahkota. */
export function Mascot({ className, title = "Maskot Istanabul, kucing oranye bermahkota" }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...a11y(title)}>
      <A11y title={title} />
      {/* mahkota */}
      <path
        d="M38 30 L44 10 L54 24 L60 6 L66 24 L76 10 L82 30 Z"
        fill="#FFC94A"
        stroke={PLUM}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="18" r="3.5" fill="#E8653F" stroke={PLUM} strokeWidth="2" />
      {/* telinga */}
      <path d="M22 48 L28 22 L48 38 Z" fill="#F08A4B" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M98 48 L92 22 L72 38 Z" fill="#F08A4B" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M29 40 L31 30 L40 37 Z" fill="#FFB3A7" />
      <path d="M91 40 L89 30 L80 37 Z" fill="#FFB3A7" />
      {/* kepala */}
      <ellipse cx="60" cy="70" rx="42" ry="36" fill="#F08A4B" stroke={PLUM} strokeWidth="4" />
      {/* belang */}
      <path d="M52 36 Q60 46 68 36" fill="none" stroke="#C24A28" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 66 L32 68 M22 76 L32 75" stroke="#C24A28" strokeWidth="4" strokeLinecap="round" />
      <path d="M98 66 L88 68 M98 76 L88 75" stroke="#C24A28" strokeWidth="4" strokeLinecap="round" />
      {/* moncong */}
      <ellipse cx="60" cy="84" rx="18" ry="13" fill="#FFE6D6" />
      {/* mata */}
      <ellipse cx="44" cy="66" rx="5" ry="6.5" fill={PLUM} />
      <ellipse cx="76" cy="66" rx="5" ry="6.5" fill={PLUM} />
      <circle cx="45.5" cy="63.5" r="1.8" fill="#FFF7EE" />
      <circle cx="77.5" cy="63.5" r="1.8" fill="#FFF7EE" />
      {/* hidung & mulut */}
      <path d="M55 79 L65 79 L60 85 Z" fill="#E8653F" stroke={PLUM} strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 85 Q60 91 53 91 M60 85 Q60 91 67 91" fill="none" stroke={PLUM} strokeWidth="3" strokeLinecap="round" />
      {/* pipi */}
      <ellipse cx="34" cy="82" rx="6" ry="4" fill="#FFB3A7" opacity="0.8" />
      <ellipse cx="86" cy="82" rx="6" ry="4" fill="#FFB3A7" opacity="0.8" />
    </svg>
  );
}

type CatKind = "persia" | "domestik" | "oyen";

const CAT_STYLES: Record<CatKind, { fur: string; inner: string; marks: string; muzzle: string }> = {
  persia: { fur: "#FFF1E2", inner: "#FFB3A7", marks: "#E9D3BE", muzzle: "#FFFDF9" },
  domestik: { fur: "#A4734F", inner: "#FFB3A7", marks: "#6E4A30", muzzle: "#E9C9A8" },
  oyen: { fur: "#F08A4B", inner: "#FFB3A7", marks: "#C24A28", muzzle: "#FFE6D6" },
};

function CatFace({ kind }: { kind: CatKind }) {
  const s = CAT_STYLES[kind];
  const fluffy = kind === "persia";
  return (
    <g>
      <path d="M20 46 L26 16 L48 34 Z" fill={s.fur} stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M100 46 L94 16 L72 34 Z" fill={s.fur} stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M27 38 L29 26 L39 34 Z" fill={s.inner} />
      <path d="M93 38 L91 26 L81 34 Z" fill={s.inner} />
      {fluffy ? (
        <path
          d="M18 66 Q12 56 20 48 Q22 34 38 32 Q48 24 60 28 Q72 24 82 32 Q98 34 100 48 Q108 56 102 66 Q108 80 96 90 Q90 104 74 104 Q60 110 46 104 Q30 104 24 90 Q12 80 18 66 Z"
          fill={s.fur}
          stroke={PLUM}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      ) : (
        <ellipse cx="60" cy="68" rx="42" ry="36" fill={s.fur} stroke={PLUM} strokeWidth="4" />
      )}
      {!fluffy && (
        <>
          <path d="M50 36 L52 46 M60 34 L60 46 M70 36 L68 46" stroke={s.marks} strokeWidth="4" strokeLinecap="round" />
          <path d="M20 64 L30 66 M20 74 L30 73 M100 64 L90 66 M100 74 L90 73" stroke={s.marks} strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {fluffy && <path d="M44 40 Q52 46 60 42 Q68 46 76 40" fill="none" stroke={s.marks} strokeWidth="3" strokeLinecap="round" />}
      <ellipse cx="60" cy="82" rx="17" ry="12" fill={s.muzzle} />
      <ellipse cx="44" cy="64" rx="5" ry="6" fill={PLUM} />
      <ellipse cx="76" cy="64" rx="5" ry="6" fill={PLUM} />
      <circle cx="45.5" cy="61.5" r="1.8" fill="#FFF7EE" />
      <circle cx="77.5" cy="61.5" r="1.8" fill="#FFF7EE" />
      <path d="M55 77 L65 77 L60 83 Z" fill="#E8653F" stroke={PLUM} strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 83 Q60 89 53 89 M60 83 Q60 89 67 89" fill="none" stroke={PLUM} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="34" cy="80" rx="6" ry="4" fill="#FFB3A7" opacity="0.8" />
      <ellipse cx="86" cy="80" rx="6" ry="4" fill="#FFB3A7" opacity="0.8" />
    </g>
  );
}

/** Poodle putih: jambul pompom dan telinga keriting. */
function PoodleFace() {
  const fur = "#FBF3EA";
  const shade = "#EADFD2";
  return (
    <g>
      {/* telinga keriting */}
      {[22, 98].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="60" r="13" fill={fur} stroke={PLUM} strokeWidth="4" />
          <circle cx={cx} cy="78" r="12" fill={fur} stroke={PLUM} strokeWidth="4" />
          <circle cx={cx} cy="94" r="10" fill={fur} stroke={PLUM} strokeWidth="4" />
        </g>
      ))}
      {/* jambul pompom */}
      <circle cx="42" cy="30" r="13" fill={fur} stroke={PLUM} strokeWidth="4" />
      <circle cx="78" cy="30" r="13" fill={fur} stroke={PLUM} strokeWidth="4" />
      <circle cx="60" cy="20" r="15" fill={fur} stroke={PLUM} strokeWidth="4" />
      {/* kepala */}
      <ellipse cx="60" cy="66" rx="32" ry="34" fill={fur} stroke={PLUM} strokeWidth="4" />
      <path d="M36 34 Q60 46 84 34" fill={fur} />
      <path d="M44 42 Q48 38 52 42 M68 42 Q72 38 76 42" fill="none" stroke={shade} strokeWidth="3" strokeLinecap="round" />
      {/* moncong */}
      <ellipse cx="60" cy="84" rx="16" ry="12" fill={shade} />
      <ellipse cx="47" cy="64" rx="4.5" ry="5.5" fill={PLUM} />
      <ellipse cx="73" cy="64" rx="4.5" ry="5.5" fill={PLUM} />
      <circle cx="48.3" cy="61.8" r="1.6" fill="#FFF7EE" />
      <circle cx="74.3" cy="61.8" r="1.6" fill="#FFF7EE" />
      <ellipse cx="60" cy="78" rx="6" ry="4.5" fill={PLUM} />
      <path d="M60 82 L60 87 Q55 91 51 88 M60 87 Q65 91 69 88" fill="none" stroke={PLUM} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="40" cy="78" rx="5" ry="3.5" fill="#FFB3A7" opacity="0.8" />
      <ellipse cx="80" cy="78" rx="5" ry="3.5" fill="#FFB3A7" opacity="0.8" />
      {/* pita kecil */}
      <path d="M52 8 L60 14 L68 8 L68 20 L60 14 L52 20 Z" fill="#FFB3A7" stroke={PLUM} strokeWidth="2.5" strokeLinejoin="round" />
    </g>
  );
}

/** Pug: muka krem, masker gelap, telinga lipat, kerutan dahi. */
function PugFace() {
  const fawn = "#E6C394";
  const mask = "#3D2F55";
  return (
    <g>
      {/* telinga lipat */}
      <path d="M24 36 Q14 30 14 46 Q20 50 32 44 Z" fill={mask} stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M96 36 Q106 30 106 46 Q100 50 88 44 Z" fill={mask} stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      {/* kepala */}
      <path
        d="M20 62 Q20 28 60 28 Q100 28 100 62 Q100 102 60 104 Q20 102 20 62 Z"
        fill={fawn}
        stroke={PLUM}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* kerutan dahi */}
      <path d="M46 42 Q60 36 74 42 M50 49 Q60 45 70 49" fill="none" stroke="#B98D5A" strokeWidth="3" strokeLinecap="round" />
      {/* masker */}
      <path d="M38 74 Q38 62 50 62 L70 62 Q82 62 82 74 Q82 96 60 98 Q38 96 38 74 Z" fill={mask} />
      {/* mata besar */}
      <circle cx="40" cy="60" r="8" fill={PLUM} stroke={PLUM} strokeWidth="2" />
      <circle cx="80" cy="60" r="8" fill={PLUM} stroke={PLUM} strokeWidth="2" />
      <circle cx="42.5" cy="57" r="2.5" fill="#FFF7EE" />
      <circle cx="82.5" cy="57" r="2.5" fill="#FFF7EE" />
      {/* hidung & mulut */}
      <ellipse cx="60" cy="72" rx="7" ry="5" fill={PLUM} />
      <ellipse cx="58" cy="70.5" rx="2" ry="1.2" fill="#5A4A66" />
      <path d="M60 77 L60 82 Q54 88 48 84 M60 82 Q66 88 72 84" fill="none" stroke="#E6C394" strokeWidth="3" strokeLinecap="round" />
      <path d="M56 86 Q60 95 64 86 Z" fill="#FFB3A7" stroke={PLUM} strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

export const PET_BG: Record<PetIllustration, string> = {
  poodle: "#E4D9F7",
  pug: "#FFE6D6",
  oyen: "#CDEFE0",
};

function PetFace({ kind }: { kind: PetIllustration }) {
  if (kind === "poodle") return <PoodleFace />;
  if (kind === "pug") return <PugFace />;
  return <CatFace kind="oyen" />;
}

export function PetAvatar({
  kind,
  className,
  title,
  framed = true,
}: SvgProps & { kind: PetIllustration; framed?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...a11y(title)}>
      <A11y title={title} />
      {framed && <rect x="0" y="0" width="120" height="120" fill={PET_BG[kind]} />}
      <g transform={framed ? "translate(6 8) scale(0.9)" : undefined}>
        <PetFace kind={kind} />
      </g>
    </svg>
  );
}

const SITTER: Record<string, { skin: string; hair: string; shirt: string; long: boolean }> = {
  "sitter-a": { skin: "#E7B48F", hair: "#3D2F55", shirt: "#7BD3B4", long: true },
  "sitter-b": { skin: "#C98E66", hair: "#2E2240", shirt: "#FFC94A", long: false },
  "sitter-c": { skin: "#F1C9A5", hair: "#6E4A30", shirt: "#FFB3A7", long: true },
};

export function SitterAvatar({ variant, className, title }: SvgProps & { variant: string }) {
  const s = SITTER[variant] ?? SITTER["sitter-a"];
  return (
    <svg viewBox="0 0 80 80" className={className} {...a11y(title)}>
      <A11y title={title} />
      <rect width="80" height="80" fill="#FFE6D6" />
      {s.long && <path d="M18 40 Q16 70 24 80 L56 80 Q64 70 62 40 Z" fill={s.hair} />}
      <path d="M14 80 Q16 60 40 58 Q64 60 66 80 Z" fill={s.shirt} stroke={PLUM} strokeWidth="3" />
      <circle cx="40" cy="38" r="17" fill={s.skin} stroke={PLUM} strokeWidth="3" />
      <path d="M22 36 Q22 18 40 18 Q58 18 58 36 Q50 28 40 30 Q30 28 22 36 Z" fill={s.hair} stroke={PLUM} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="34" cy="40" r="2.2" fill={PLUM} />
      <circle cx="46" cy="40" r="2.2" fill={PLUM} />
      <path d="M35 47 Q40 51 45 47" fill="none" stroke={PLUM} strokeWidth="2.5" strokeLinecap="round" />
      {/* bros jejak kaki di baju */}
      <circle cx="50" cy="70" r="3" fill={PLUM} opacity="0.5" />
    </svg>
  );
}

/** Placeholder CCTV: kucing tidur melingkar di bantal. */
export function SleepingCat({ className, title }: SvgProps) {
  return (
    <svg viewBox="0 0 240 140" className={className} {...a11y(title)}>
      <A11y title={title} />
      <ellipse cx="120" cy="118" rx="96" ry="16" fill="#3D2F55" />
      <path d="M36 112 Q36 92 70 90 L170 90 Q204 92 204 112 Q204 124 170 124 L70 124 Q36 124 36 112 Z" fill="#E4D9F7" stroke={PLUM} strokeWidth="4" />
      {/* badan */}
      <path d="M62 98 Q60 52 118 50 Q176 50 178 96 Q178 106 160 106 L80 106 Q62 106 62 98 Z" fill="#F08A4B" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      {/* ekor */}
      <path d="M170 100 Q196 96 188 78 Q184 70 176 74" fill="none" stroke={PLUM} strokeWidth="12" strokeLinecap="round" />
      <path d="M170 100 Q196 96 188 78 Q184 70 176 74" fill="none" stroke="#F08A4B" strokeWidth="6" strokeLinecap="round" />
      {/* kepala */}
      <path d="M70 70 L74 50 L88 62 Z" fill="#F08A4B" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M112 66 L110 46 L96 58 Z" fill="#F08A4B" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="92" cy="82" rx="26" ry="22" fill="#F08A4B" stroke={PLUM} strokeWidth="4" />
      <path d="M78 80 Q83 84 88 80 M96 80 Q101 84 106 80" fill="none" stroke={PLUM} strokeWidth="3" strokeLinecap="round" />
      <path d="M89 88 L95 88 L92 92 Z" fill="#E8653F" />
      <path d="M128 64 Q140 58 152 64" fill="none" stroke="#C24A28" strokeWidth="4" strokeLinecap="round" />
      <path d="M132 76 Q144 70 156 76" fill="none" stroke="#C24A28" strokeWidth="4" strokeLinecap="round" />
      {/* zzz */}
      <text x="124" y="40" fontFamily="var(--font-fredoka)" fontSize="18" fontWeight="600" fill="#FFC94A">z</text>
      <text x="138" y="28" fontFamily="var(--font-fredoka)" fontSize="22" fontWeight="600" fill="#FFC94A">z</text>
      <text x="156" y="16" fontFamily="var(--font-fredoka)" fontSize="26" fontWeight="600" fill="#FFC94A">Z</text>
    </svg>
  );
}

/** 404: anabul nyasar bawa peta. */
export function LostPet({ className, title }: SvgProps) {
  return (
    <svg viewBox="0 0 220 180" className={className} {...a11y(title)}>
      <A11y title={title} />
      <path d="M20 160 Q110 140 200 160" fill="none" stroke={PLUM} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 12" />
      {/* tanda arah */}
      <rect x="150" y="70" width="8" height="90" fill="#3D2F55" />
      <path d="M128 60 L188 60 L200 74 L188 88 L128 88 Z" fill="#FFC94A" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M190 100 L136 100 L124 114 L136 128 L190 128 Z" fill="#FFB3A7" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <text x="144" y="80" fontFamily="var(--font-fredoka)" fontSize="15" fontWeight="600" fill={PLUM}>Pulang</text>
      <text x="142" y="120" fontFamily="var(--font-fredoka)" fontSize="15" fontWeight="600" fill={PLUM}>Nyasar</text>
      {/* kucing bingung */}
      <g transform="translate(6 34) scale(0.95)">
        <CatFace kind="domestik" />
      </g>
      <text x="96" y="40" fontFamily="var(--font-fredoka)" fontSize="34" fontWeight="700" fill="#C24A28">?</text>
    </svg>
  );
}

/** Empty state: kotak kardus kosong dengan kucing ngintip. */
export function EmptyBox({ className, title }: SvgProps) {
  return (
    <svg viewBox="0 0 200 150" className={className} {...a11y(title)}>
      <A11y title={title} />
      <g transform="translate(58 6) scale(0.7)">
        <CatFace kind="persia" />
      </g>
      <path d="M30 70 L170 70 L160 140 L40 140 Z" fill="#E9C9A8" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M30 70 L14 50 L84 50 L100 70 Z" fill="#F6DCB4" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M170 70 L186 50 L116 50 L100 70 Z" fill="#F6DCB4" stroke={PLUM} strokeWidth="4" strokeLinejoin="round" />
      <path d="M86 100 L114 100" stroke={PLUM} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <ellipse cx="12" cy="16" rx="5" ry="4.2" />
      <ellipse cx="5.5" cy="10.5" rx="2.2" ry="2.8" />
      <ellipse cx="18.5" cy="10.5" rx="2.2" ry="2.8" />
      <ellipse cx="9" cy="6" rx="2.1" ry="2.7" />
      <ellipse cx="15" cy="6" rx="2.1" ry="2.7" />
    </svg>
  );
}
