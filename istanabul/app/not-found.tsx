import { LostPage } from "@/components/LostPage";

export default function NotFound() {
  return (
    <main className="min-h-dvh px-4">
      <LostPage
        title="Waduh, ada anabul nyasar"
        message="Halaman yang kamu cari kabur entah ke mana. Mungkin lagi ngumpet di kardus."
      />
    </main>
  );
}
