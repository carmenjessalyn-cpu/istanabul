import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { findUserById } from "@/data/users";
import type { PublicUser } from "@/types";
import { SESSION_COOKIE, readSessionValue } from "./session";

export async function getCurrentUser(): Promise<PublicUser | null> {
  const raw = (await cookies()).get(SESSION_COOKIE)?.value;
  const userId = await readSessionValue(raw);
  if (!userId) return null;
  const user = findUserById(userId);
  if (!user) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  return rest;
}

/** Dipakai di halaman yang wajib login. Middleware sudah jaga, ini lapis kedua. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
