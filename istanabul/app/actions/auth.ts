"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserByEmail } from "@/data/users";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionValue } from "@/lib/session";

export interface LoginState {
  error?: string;
  fieldErrors?: { email?: string; password?: string };
  email?: string;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function safeNext(next: FormDataEntryValue | null) {
  if (typeof next !== "string") return "/dashboard";
  // hanya izinkan path internal
  if (!next.startsWith("/") || next.startsWith("//")) return "/dashboard";
  return next;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fieldErrors: LoginState["fieldErrors"] = {};
  if (!email) fieldErrors.email = "Email-nya diisi dulu ya";
  else if (!/^\S+@\S+\.\S+$/.test(email)) fieldErrors.email = "Format email-nya kayaknya belum pas";
  if (!password) fieldErrors.password = "Password-nya juga diisi ya";
  if (fieldErrors.email || fieldErrors.password) return { fieldErrors, email };

  // jeda kecil biar state loading kelihatan, seperti request sungguhan
  await wait(700);

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return { error: "Email atau password-nya belum cocok, coba cek lagi ya", email };
  }

  (await cookies()).set(SESSION_COOKIE, await createSessionValue(user.id), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(safeNext(formData.get("next")));
}

export async function logoutAction() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/login");
}

export interface ResetState {
  sent?: boolean;
  email?: string;
  error?: string;
}

export async function forgotPasswordAction(_prev: ResetState, formData: FormData): Promise<ResetState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Email-nya diisi dulu ya" };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Format email-nya kayaknya belum pas", email };
  await wait(700);
  // Mock: selalu dianggap terkirim, supaya tidak membocorkan email mana yang terdaftar.
  return { sent: true, email };
}
