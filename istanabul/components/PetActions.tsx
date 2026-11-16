"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircleHeart, PhoneCall, Send, X } from "lucide-react";
import { SitterAvatar } from "./illustrations";
import { chatSeed, sitterAutoReplies } from "@/data/chat";
import { formatJamWib } from "@/lib/time";
import type { ChatMessage, Sitter } from "@/types";

export function PetActions({
  petName,
  sitter,
  emergencyPhone,
  emergencyLabel,
}: {
  petName: string;
  sitter: Sitter;
  emergencyPhone: string;
  emergencyLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="btn-primary px-2 text-[15px] sm:px-4 sm:text-base"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <MessageCircleHeart className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
          <span className="whitespace-nowrap">Chat pet sitter</span>
        </button>
        <a href={`tel:${emergencyPhone}`} className="btn-secondary px-2 text-[15px] sm:px-4 sm:text-base" aria-label={`Telepon darurat ${emergencyLabel}`}>
          <PhoneCall className="h-4 w-4 shrink-0 text-coral-text sm:h-5 sm:w-5" aria-hidden="true" />
          <span className="whitespace-nowrap">Telepon darurat</span>
        </a>
      </div>
      {open &&
        createPortal(
        <ChatPanel
          petName={petName}
          sitter={sitter}
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
        />,
          document.body,
        )}
    </>
  );
}

const fill = (t: string, name: string) => t.replaceAll("{name}", name);

function ChatPanel({ petName, sitter, onClose }: { petName: string; sitter: Sitter; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    chatSeed.map((m) => ({ ...m, text: fill(m.text, petName) })),
  );
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const replyIdx = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // focus trap sederhana
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]):not([tabindex='-1']), input");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const pending = timers.current;
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      pending.forEach(clearTimeout);
    };
  }, [onClose]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, from: "user", text: value, time: formatJamWib() }]);
    setText("");
    setTyping(true);
    const t = setTimeout(() => {
      const reply = sitterAutoReplies[replyIdx.current % sitterAutoReplies.length];
      replyIdx.current += 1;
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: `s-${Date.now()}`, from: "sitter", text: fill(reply, petName), time: formatJamWib() },
      ]);
    }, 1400);
    timers.current.push(t);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-stretch sm:justify-end">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-plum/50 motion-safe:animate-fade-up"
        aria-label="Tutup chat"
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        className="relative flex h-[85dvh] w-full flex-col overflow-hidden rounded-t-3xl border-x-3 border-t-3 border-plum bg-cream motion-safe:animate-slide-up sm:h-full sm:max-w-md sm:rounded-none sm:rounded-l-3xl sm:border-b-3 sm:border-r-0 sm:motion-safe:animate-slide-in"
      >
        <header className="flex items-center gap-3 border-b-3 border-plum bg-card px-4 py-3">
          <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-3 border-plum">
            <SitterAvatar variant={sitter.avatar} className="h-full w-full" title={`Foto ${sitter.name}`} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="chat-title" className="font-display text-lg font-semibold leading-tight text-plum">
              {sitter.name}
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-ink">
              <span className="h-2 w-2 rounded-full bg-mint-deep" aria-hidden="true" />
              Online · jagain {petName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border-3 border-plum bg-card text-plum hover:bg-peach"
            aria-label="Tutup chat"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <ol ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-label="Pesan">
          <li className="text-center">
            <span className="chip bg-peach">Hari ini</span>
          </li>
          {messages.map((m) => (
            <li key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-3xl border-3 border-plum px-3.5 py-2 ${
                  m.from === "user" ? "rounded-br-md bg-sun" : "rounded-bl-md bg-card"
                }`}
              >
                <p className="break-words text-plum">{m.text}</p>
                <p className="mt-0.5 text-right text-xs font-semibold text-ink">{m.time}</p>
              </div>
            </li>
          ))}
          {typing && (
            <li className="flex justify-start">
              <span className="rounded-3xl rounded-bl-md border-3 border-plum bg-card px-3.5 py-2 text-sm font-semibold text-ink">
                {sitter.name} lagi ngetik...
              </span>
            </li>
          )}
        </ol>

        <form onSubmit={send} className="flex items-center gap-2 border-t-3 border-plum bg-card p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <label htmlFor="chat-input" className="sr-only">
            Tulis pesan untuk {sitter.name}
          </label>
          <input
            ref={inputRef}
            id="chat-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Tanya kabar ${petName}...`}
            className="input min-h-[48px] flex-1 rounded-full"
            autoComplete="off"
          />
          <button
            type="submit"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-3 border-plum bg-sun text-plum shadow-block-xs transition-transform duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
            aria-label="Kirim pesan"
            disabled={!text.trim()}
          >
            <Send className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
