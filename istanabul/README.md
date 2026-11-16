# Istanabul · Istana Anabul

Web app mockup untuk pawrents yang sudah booking di Istanabul, pet hotel di Jakarta. Isinya CCTV kamar, kondisi harian, jadwal makan, play time, riwayat menginap, info booking, dan hasil cek kesehatan saat check-in.

Dibuat dengan Next.js 16 (App Router, Turbopack), React 19, TypeScript, dan Tailwind CSS 3. Tidak pakai database, semua data adalah mock statis di folder `/data`.

## Jalankan di lokal

Butuh Node.js 20.9 atau lebih baru (syarat minimal Next.js 16).

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Kamu akan diarahkan ke halaman login.

Build production:

```bash
npm run build
npm start
```

## Akun demo

| Email | Password | Anabul |
| --- | --- | --- |
| dinda@istanabul.id | meong123 | Mochi (Persia), Kopi (domestik) |
| raka@istanabul.id | gukguk123 | Bruno (Golden Retriever) |

Kredensial ini juga tampil di bawah form login, lengkap dengan tombol "Pakai" untuk isi otomatis.

## Deploy ke Vercel

1. Push folder ini ke repo GitHub/GitLab/Bitbucket.
2. Di vercel.com pilih **Add New → Project**, lalu import repo tersebut.
3. Framework akan terdeteksi otomatis sebagai Next.js. Tidak perlu mengubah setting apa pun, langsung klik **Deploy**.

Alternatif lewat CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Opsional: tambahkan environment variable `SESSION_SECRET` (string acak panjang) di Vercel supaya tanda tangan cookie session tidak memakai secret default.

## Mengganti video CCTV

1. Taruh file `.mp4` di folder `/public/cctv/`, misalnya `/public/cctv/kamar-08.mp4`.
2. Buka `/data/pets.ts`, lalu sesuaikan field `cctvFile` milik anabul yang bersangkutan:

```ts
cctvFile: "kamar-08.mp4",
```

Video diputar otomatis (autoplay, muted, loop, playsInline). Kalau file belum ada atau gagal dimuat, player menampilkan ilustrasi kucing tidur dengan tulisan "Kamera lagi disiapkan".

Tips: pakai H.264 + `faststart` supaya video cepat mulai diputar di HP:

```bash
ffmpeg -i input.mov -c:v libx264 -crf 26 -preset veryfast -movflags +faststart -an kamar-08.mp4
```

Bawaan project: `kamar-07.mp4` (Mochi) dan `kamar-12.mp4` (Bruno) berisi sample video. Kamar Kopi (`kamar-08.mp4`) sengaja dikosongkan supaya kamu bisa lihat tampilan placeholder-nya.

## Cara kerja autentikasi (mock)

- Login dicek ke daftar akun di `/data/users.ts` lewat Server Action (`app/actions/auth.ts`).
- Kalau cocok, server menyimpan cookie `httpOnly` berisi user id yang ditandatangani HMAC-SHA256 (`lib/session.ts`).
- `middleware.ts` melindungi `/dashboard`, `/anabul/*`, `/notifikasi`, dan `/profil`. Tanpa session valid, pengunjung diarahkan ke `/login`.
- Halaman `/anabul/[id]` juga mengecek kepemilikan. Anabul milik akun lain dianggap tidak ada (halaman 404).
- "Lupa password" hanya mock: setelah submit muncul pesan bahwa link reset sudah dikirim.

Catatan: di Next.js 16 nama file `middleware.ts` sudah berstatus deprecated (diganti `proxy.ts`), jadi saat build muncul satu warning. File ini tetap jalan normal. Kalau mau hilangkan warning-nya, jalankan `npx @next/codemod@canary middleware-to-proxy .`

Password di mock data disimpan polos. Untuk produk sungguhan, ganti dengan database dan password yang di-hash.

## Struktur folder

```
app/
  (app)/            halaman yang butuh login + layout sidebar/bottom nav
    dashboard/
    anabul/[id]/
    notifikasi/
    profil/
  actions/auth.ts   server action login, logout, lupa password
  login/  lupa-password/  not-found.tsx
components/         VideoCctv, ConditionCard, FeedingTimeline, PlaytimeTimeline,
                    DailyHistory, BookingInfo, HealthCheckCard, PetActions (chat),
                    BottomNav, Sidebar, illustrations (SVG maskot & anabul), dll.
data/               mock data: users, pets, sitters, notifications, chat
lib/                session, auth, helper waktu WIB, perhitungan masa inap
types/              semua type TypeScript
public/cctv/        file video CCTV
```

## Catatan data mock

- Tanggal booking dihitung relatif dari hari ini (`checkInOffsetDays` di `/data/pets.ts`), jadi demo selalu terlihat sedang berlangsung.
- Log hari terakhir dianggap log hari ini. Jadwal makan dan sesi main yang jamnya belum lewat (WIB) otomatis tampil sebagai "Terjadwal" / "Nanti", dan penanda "Sekarang" ikut bergeser.
- Semua jam memakai format 24 jam WIB, tanggal memakai format Indonesia ("Senin, 16 Nov").

## Design token

Warna, font, dan bayangan offset ada di `tailwind.config.ts`. Komponen dasar (`.card`, `.btn-primary`, `.chip`, `.input`) ada di `app/globals.css`. Font Fredoka dan Nunito dimuat lewat `next/font/google`.
