import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotForm } from "@/components/auth/ForgotForm";

export const metadata: Metadata = { title: "Lupa password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Lupa password? Santai."
      subtitle="Tulis email kamu, nanti kami kirim link buat bikin password baru."
    >
      <ForgotForm />
    </AuthShell>
  );
}
