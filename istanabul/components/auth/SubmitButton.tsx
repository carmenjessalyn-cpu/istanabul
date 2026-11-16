"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function SubmitButton({ children, pendingText }: { children: React.ReactNode; pendingText: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full text-lg" disabled={pending} aria-disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 motion-safe:animate-spin" aria-hidden="true" />
          <span>{pendingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
