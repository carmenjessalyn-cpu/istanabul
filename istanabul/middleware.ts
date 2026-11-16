import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readSessionValue } from "@/lib/session";

const PROTECTED = ["/dashboard", "/anabul", "/notifikasi", "/profil"];
const AUTH_PAGES = ["/login", "/lupa-password"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userId = await readSessionValue(req.cookies.get(SESSION_COOKIE)?.value);

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (isProtected && !userId) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = pathname === "/dashboard" ? "" : `?next=${encodeURIComponent(pathname)}`;
    const res = NextResponse.redirect(url);
    // cookie rusak/palsu dibersihkan
    if (req.cookies.get(SESSION_COOKIE)) res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  if (AUTH_PAGES.includes(pathname) && userId) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/anabul/:path*",
    "/notifikasi/:path*",
    "/profil/:path*",
    "/login",
    "/lupa-password",
  ],
};
