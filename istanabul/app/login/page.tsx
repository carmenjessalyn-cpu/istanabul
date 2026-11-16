import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Masuk" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <AuthShell title="Halo lagi, pawrents!" subtitle="Masuk dulu buat lihat kabar anabul kamu hari ini.">
      <LoginForm next={next} />
    </AuthShell>
  );
}
