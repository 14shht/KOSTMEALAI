import { CheckCheck, Info, Plus, Share2, ShoppingBag } from "lucide-react";
import { ShoppingCategoryCard } from "@/components/cards/ShoppingCategoryCard";
import { TipsCard } from "@/components/cards/TipsCard";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { shoppingCategories } from "@/lib/mock-data";

export default function ShoppingListPage() {
  return (
    <AppShell>
      <SectionHeader
        title="Daftar Belanja Mingguan"
        subtitle="Periode: 20 - 26 Mei 2024"
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" leftIcon={<Plus className="h-4 w-4" />}>Tambah Bahan Manual</Button>
            <Button leftIcon={<CheckCheck className="h-4 w-4" />}>Tandai Semua Dibeli</Button>
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <main>
          <div className="grid gap-6 md:grid-cols-2">
            {shoppingCategories.map((category) => <ShoppingCategoryCard key={category.title} {...category} />)}
          </div>
          <TipsCard title="Tips Belanja Hemat" dark className="mt-6">
            Belanja di Pasar Tradisional jam 6 pagi bisa menghemat hingga 15% dari total estimasi belanja mingguan Anda!
          </TipsCard>
        </main>
        <aside className="space-y-6">
          <Card className="p-6" hover={false}>
            <h2 className="mb-7 flex items-center gap-2 text-2xl font-semibold"><ShoppingBag className="h-6 w-6" />Ringkasan Belanja</h2>
            <div className="space-y-5">
              <div className="flex justify-between"><span>Total Estimasi</span><b className="text-xl text-primary">Rp 114.500</b></div>
              <div className="h-px bg-border-soft" />
              <div className="flex justify-between"><span>Anggaran Mingguan</span><b>Rp 150.000</b></div>
              <div className="flex justify-between"><span>Sisa Anggaran</span><b className="text-brown-orange">Rp 35.500</b></div>
              <div>
                <div className="mb-2 flex justify-between"><span>Budget Terpakai</span><span>76%</span></div>
                <ProgressBar value={76} barClassName="bg-brown-orange" />
              </div>
              <div className="rounded-xl bg-soft-green p-4 text-text-secondary">
                <Info className="mb-2 h-5 w-5 text-primary" />
                Estimasi harga berdasarkan rata-rata pasar terdekat. Harga sebenarnya mungkin berbeda.
              </div>
              <Button variant="orange" className="w-full" leftIcon={<Share2 className="h-4 w-4" />}>Bagikan Daftar</Button>
            </div>
          </Card>
          <Card className="flex items-center gap-4 bg-muted-green p-4" hover={false}>
            <span className="rounded-xl bg-white p-3 text-brown-orange"><ShoppingBag className="h-5 w-5" /></span>
            <div><b>Lupa beli sesuatu?</b><p className="text-text-secondary">Lihat rekomendasi bumbu dasar.</p></div>
          </Card>
          <Card className="food-gradient-2 min-h-44 p-5" hover={false}>
            <div className="mt-20 rounded-xl bg-white/80 p-3">
              <b>Produk Lokal Segar</b>
              <p className="text-sm text-text-secondary">Dukung petani lokal.</p>
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}
