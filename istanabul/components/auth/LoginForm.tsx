"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { SubmitButton } from "./SubmitButton";

const DEMO = [
  { email: "dinda@istanabul.id", password: "meong123", label: "Dinda · 2 anabul" },
  { email: "raka@istanabul.id", password: "gukguk123", label: "Raka · 1 anabul" },
];

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, {});
  const [show, setShow] = useState(false);
  // Controlled, supaya isian tidak hilang saat React me-reset form setelah action.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passRef = useRef<HTMLInputElement>(null);

  const fill = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
    passRef.current?.focus();
  };

  const emailErr = state.fieldErrors?.email;
  const passErr = state.fieldErrors?.password;

  return (
    <>
      <form action={formAction} className="space-y-5" noValidate>
        {next && <input type="hidden" name="next" value={next} />}

        {state.error && (
          <div role="alert" className="flex items-start gap-3 rounded-2xl border-3 border-plum bg-pink/60 p-3.5 text-plum">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="font-semibold">{state.error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1.5 block font-display font-semibold text-plum">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            aria-invalid={Boolean(emailErr)}
            aria-describedby={emailErr ? "email-error" : undefined}
            required
          />
          {emailErr && (
            <p id="email-error" className="mt-1.5 text-sm font-semibold text-coral-text">
              {emailErr}
            </p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor="password" className="font-display font-semibold text-plum">
              Password
            </label>
            <Link
              href="/lupa-password"
              className="inline-flex min-h-[44px] items-center px-1 text-sm font-bold text-coral-text underline-offset-4 hover:underline"
            >
              Lupa password?
            </Link>
          </div>
          <div className="relative">
            <input
              ref={passRef}
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password kamu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pr-14"
              aria-invalid={Boolean(passErr)}
              aria-describedby={passErr ? "password-error" : undefined}
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-plum hover:bg-peach"
              aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
              aria-pressed={show}
            >
              {show ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
          {passErr && (
            <p id="password-error" className="mt-1.5 text-sm font-semibold text-coral-text">
              {passErr}
            </p>
          )}
        </div>

        <SubmitButton pendingText="Lagi ngecek...">Masuk</SubmitButton>
      </form>

      <div className="mt-6 rounded-2xl border-2 border-dashed border-plum/40 bg-cream p-3.5">
        <p className="font-display text-sm font-semibold text-plum">Akun demo</p>
        <ul className="mt-2 space-y-1.5">
          {DEMO.map((d) => (
            <li key={d.email} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-ink">
              <span className="min-w-0 break-all">
                <span className="font-bold text-plum">{d.email}</span> / {d.password}
              </span>
              <button
                type="button"
                onClick={() => fill(d.email, d.password)}
                className="inline-flex min-h-[44px] items-center rounded-full px-2 font-bold text-coral-text underline-offset-4 hover:underline"
                aria-label={`Isi form dengan akun demo ${d.label}`}
              >
                Pakai
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
