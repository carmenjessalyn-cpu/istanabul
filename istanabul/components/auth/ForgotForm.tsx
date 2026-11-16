"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { forgotPasswordAction, type ResetState } from "@/app/actions/auth";
import { SubmitButton } from "./SubmitButton";

export function ForgotForm() {
  const [state, formAction] = useActionState<ResetState, FormData>(forgotPasswordAction, {});
  const [email, setEmail] = useState("");

  if (state.sent) {
    return (
      <div className="space-y-5" role="status">
        <div className="flex items-start gap-3 rounded-2xl border-3 border-plum bg-mint p-4 text-plum">
          <MailCheck className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-display text-lg font-semibold">Link reset sudah dikirim ke email kamu</p>
            <p className="mt-1 text-sm text-plum-2">
              Cek inbox <span className="font-bold break-all">{state.email}</span>. Kalau belum muncul, intip folder spam juga ya.
            </p>
          </div>
        </div>
        <Link href="/login" className="btn-secondary w-full">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Balik ke halaman masuk
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label htmlFor="reset-email" className="mb-1.5 block font-display font-semibold text-plum">
          Email yang terdaftar
        </label>
        <input
          id="reset-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "reset-error" : undefined}
          required
        />
        {state.error && (
          <p id="reset-error" className="mt-1.5 text-sm font-semibold text-coral-text">
            {state.error}
          </p>
        )}
      </div>
      <SubmitButton pendingText="Lagi ngirim...">Kirim link reset</SubmitButton>
      <Link
        href="/login"
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-full font-display font-semibold text-plum hover:text-coral-text"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Udah ingat? Masuk aja
      </Link>
    </form>
  );
}
