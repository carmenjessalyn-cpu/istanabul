/**
 * Session mock yang ditandatangani HMAC-SHA256.
 * Isi cookie: `<userId>.<signature>`. Dipakai di middleware (Edge) dan server,
 * makanya hanya pakai Web Crypto API.
 */
export const SESSION_COOKIE = "istanabul_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

const SECRET =
  process.env.SESSION_SECRET ?? "istanabul-mock-secret-ganti-di-production";

async function hmac(value: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionValue(userId: string) {
  return `${userId}.${await hmac(userId)}`;
}

/** Mengembalikan userId kalau tanda tangan valid, selain itu null. */
export async function readSessionValue(value: string | undefined | null) {
  if (!value) return null;
  const idx = value.lastIndexOf(".");
  if (idx <= 0) return null;
  const userId = value.slice(0, idx);
  const sig = value.slice(idx + 1);
  const expected = await hmac(userId);
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0 ? userId : null;
}
