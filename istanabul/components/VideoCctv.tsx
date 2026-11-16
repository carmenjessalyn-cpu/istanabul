"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, Video } from "lucide-react";
import { SleepingCat } from "./illustrations";
import { formatJamWib, formatTanggal, wibNow } from "@/lib/time";

type Status = "loading" | "ready" | "error";

type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

function LiveClock() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-display text-sm font-semibold tabular-nums tracking-wide text-cream sm:text-base" aria-live="off">
      {now === null ? "--:--:--" : (
        <>
          <span className="hidden sm:inline">{formatTanggal(wibNow(now))} · </span>
          {formatJamWib(now, true)} WIB
        </>
      )}
    </span>
  );
}

export function VideoCctv({
  src,
  room,
  petName,
  sitterName,
}: {
  src: string;
  room: string;
  petName: string;
  sitterName: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [isFull, setIsFull] = useState(false);

  // Video baru dirender setelah mount, supaya event error dari file yang
  // belum ada tidak terlewat sebelum hydration.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const v = videoRef.current;
    if (!mounted || !v) return;
    v.muted = true;
    if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      setStatus("error");
      return;
    }
    if (v.readyState >= 2) setStatus("ready");
    v.play().catch(() => {
      /* autoplay bisa ditolak browser; video tetap tampil frame pertama */
    });
    // Jaga-jaga kalau server tidak pernah merespons
    const timeout = setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
    }, 12000);
    return () => clearTimeout(timeout);
  }, [mounted, src]);

  useEffect(() => {
    const onChange = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const wrap = wrapRef.current;
    const video = videoRef.current as WebkitVideo | null;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (wrap?.requestFullscreen) {
        await wrap.requestFullscreen();
      } else if (video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen(); // iOS Safari
      }
    } catch {
      /* abaikan */
    }
  }, []);

  const camLabel = room.replace("Kamar", "CAM");

  return (
    <div
      ref={wrapRef}
      className="card relative aspect-video w-full overflow-hidden bg-plum-2 p-0 [&:fullscreen]:rounded-none [&:fullscreen]:border-0"
    >
      {mounted && status !== "error" && (
        <video
          ref={videoRef}
          src={src}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            status === "ready" ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`Rekaman CCTV ${room}, tempat ${petName} menginap`}
          onLoadedData={() => setStatus("ready")}
          onCanPlay={() => setStatus("ready")}
          onError={() => setStatus("error")}
        />
      )}

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="flex items-center gap-2 rounded-full bg-plum px-4 py-2 font-display text-sm font-semibold text-cream">
            <Video className="h-4 w-4 motion-safe:animate-pulse" />
            Nyambungin kamera...
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-plum-2 px-6 pb-10 pt-8 text-center sm:pb-6 sm:pt-6" role="img" aria-label={`Kamera ${room} lagi disiapkan`}>
          <SleepingCat className="h-auto w-28 sm:w-56" />
          <p className="mt-2 font-display text-lg font-semibold text-cream sm:mt-3 sm:text-2xl">Kamera lagi disiapkan</p>
          <p className="mt-1 hidden max-w-sm text-peach sm:block">
            Tenang, {petName} tetap dipantau langsung sama {sitterName}.
          </p>
        </div>
      )}

      {/* overlay atas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
        {status !== "error" ? (
          <span className="flex items-center gap-1.5 rounded-lg bg-live px-2.5 py-1 font-display text-xs font-bold uppercase tracking-widest text-cream sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-cream motion-safe:animate-live-dot" aria-hidden="true" />
            Live
          </span>
        ) : (
          <span />
        )}
        <span className="rounded-lg bg-plum/80 px-2.5 py-1 font-display text-xs font-semibold text-cream sm:text-sm">
          {camLabel} · {room}
        </span>
      </div>

      {/* overlay bawah */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
        <span className="pointer-events-none rounded-lg bg-plum/80 px-2.5 py-1">
          <LiveClock />
        </span>
        {status !== "error" && (
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream bg-plum/80 text-cream transition-colors duration-200 hover:bg-plum"
            aria-label={isFull ? "Keluar dari layar penuh" : "Tampilkan layar penuh"}
          >
            {isFull ? <Minimize2 className="h-5 w-5" aria-hidden="true" /> : <Maximize2 className="h-5 w-5" aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
