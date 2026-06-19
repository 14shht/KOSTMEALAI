"use client";

import { useMemo, useState } from "react";
import { Beef, CheckCheck, Info, Leaf, Plus, Share2, ShoppingBag, Soup, Utensils } from "lucide-react";
import { useToast } from "@/components/feedback/ToastProvider";
import { AppShell } from "@/components/layout/AppShell";
import { BaseModal } from "@/components/modals/BaseModal";
import { ShareModal } from "@/components/modals/ShareModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Select } from "@/components/ui/Select";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useKostMealStore } from "@/lib/store/use-kostmeal-store";
import { formatRupiah } from "@/lib/utils";

const categoryIcons = {
  Karbohidrat: Soup,
  Carbohydrates: Soup,
  Protein: Beef,
  Sayur: Leaf,
  Vegetables: Leaf,
  Seasoning: Utensils,
  Bumbu: Utensils,
};

export default function ShoppingListPage() {
  const { showToast } = useToast();
  const { activeMealPlan, shoppingList, toggleShoppingItem, markAllShoppingBought, addShoppingItem } = useKostMealStore();
  const [addOpen, setAddOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Bumbu");
  const [quantity, setQuantity] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("5000");

  const groupedItems = useMemo(() => (
    shoppingList.reduce<Record<string, typeof shoppingList>>((groups, item) => {
      groups[item.category] = [...(groups[item.category] ?? []), item];
      return groups;
    }, {})
  ), [shoppingList]);

  const totalEstimate = shoppingList.reduce((total, item) => total + item.estimatedPrice, 0);
  const weeklyBudget = activeMealPlan?.summary.weeklyBudget ?? 150000;
  const remainingBudget = Math.max(weeklyBudget - totalEstimate, 0);
  const boughtCount = shoppingList.filter((item) => item.checked).length;
  const remainingCount = shoppingList.length - boughtCount;
  const shoppingProgress = shoppingList.length ? Math.round((boughtCount / shoppingList.length) * 100) : 0;
  const budgetProgress = weeklyBudget ? Math.min(Math.round((totalEstimate / weeklyBudget) * 100), 100) : 0;
  const shareText = shoppingList.map((item) => `${item.checked ? "[x]" : "[ ]"} ${item.name} - ${item.quantity} (${formatRupiah(item.estimatedPrice)})`).join("\n");

  const addManualItem = () => {
    if (!name.trim() || !quantity.trim()) return;
    addShoppingItem({
      name: name.trim(),
      category,
      quantity: quantity.trim(),
      estimatedPrice: Number(estimatedPrice) || 0,
    });
    setName("");
    setQuantity("");
    setEstimatedPrice("5000");
    setAddOpen(false);
    showToast("Item belanja berhasil ditambahkan.");
  };

  const addRecommendation = () => {
    addShoppingItem({
      name: "Bawang merah",
      category: "Bumbu",
      quantity: "100g",
      estimatedPrice: 8000,
    });
    showToast("Item belanja berhasil ditambahkan.");
  };

  return (
    <AppShell>
      <SectionHeader
        title="Daftar Belanja Mingguan"
        subtitle={activeMealPlan ? `Periode: ${activeMealPlan.days.length} hari meal plan aktif` : "Belum ada meal plan aktif"}
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" variant="secondary" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setAddOpen(true)}>Tambah Bahan Manual</Button>
            <Button type="button" leftIcon={<CheckCheck className="h-4 w-4" />} onClick={() => {
              markAllShoppingBought();
              showToast("Semua item ditandai dibeli.");
            }}>Tandai Semua Dibeli</Button>
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <main>
          {shoppingList.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(groupedItems).map(([groupName, items]) => {
                const Icon = categoryIcons[groupName as keyof typeof categoryIcons] ?? ShoppingBag;
                return (
                  <Card key={groupName} className="p-5">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light/25 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="text-xl font-semibold text-text-primary">{groupName}</h3>
                      </div>
                      <Badge tone="muted" className="normal-case">{items.length} Items</Badge>
                    </div>
                    <div className="space-y-5">
                      {items.map((item) => (
                        <Checkbox
                          key={item.id}
                          checked={item.checked}
                          onChange={() => toggleShoppingItem(item.id)}
                          label={
                            <span className={item.checked ? "text-text-secondary line-through" : ""}>
                              <span className="block font-medium">{item.name}</span>
                              <span className="text-text-secondary">{item.quantity} - Est. {formatRupiah(item.estimatedPrice)}</span>
                            </span>
                          }
                        />
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center" hover={false}>
              <h2 className="text-2xl font-bold">Belum ada daftar belanja.</h2>
              <p className="mt-2 text-text-secondary">Buat meal plan atau tambah bahan manual untuk mulai.</p>
              <Button type="button" className="mt-5" onClick={() => setAddOpen(true)}>Tambah Bahan Manual</Button>
            </Card>
          )}
          <Card className="mt-6 bg-primary p-6 text-white" hover={false}>
            <b>Tips Belanja Hemat</b>
            <p className="mt-2 text-white/85">Belanja di pasar tradisional jam 6 pagi bisa menghemat hingga 15% dari total estimasi belanja mingguan.</p>
          </Card>
        </main>
        <aside className="space-y-6">
          <Card className="p-6" hover={false}>
            <h2 className="mb-7 flex items-center gap-2 text-2xl font-semibold"><ShoppingBag className="h-6 w-6" />Ringkasan Belanja</h2>
            <div className="space-y-5">
              <div className="flex justify-between"><span>Total Estimasi</span><b className="text-xl text-primary">{formatRupiah(totalEstimate)}</b></div>
              <div className="h-px bg-border-soft" />
              <div className="flex justify-between"><span>Anggaran Mingguan</span><b>{formatRupiah(weeklyBudget)}</b></div>
              <div className="flex justify-between"><span>Sisa Anggaran</span><b className="text-brown-orange">{formatRupiah(remainingBudget)}</b></div>
              <div>
                <div className="mb-2 flex justify-between"><span>Budget Terpakai</span><span>{budgetProgress}%</span></div>
                <ProgressBar value={budgetProgress} barClassName="bg-brown-orange" />
              </div>
              <div>
                <div className="mb-2 flex justify-between"><span>Belanja Selesai</span><span>{shoppingProgress}%</span></div>
                <ProgressBar value={shoppingProgress} />
                <p className="mt-2 text-sm text-text-secondary">{remainingCount} item belum dibeli</p>
              </div>
              <div className="rounded-xl bg-soft-green p-4 text-text-secondary">
                <Info className="mb-2 h-5 w-5 text-primary" />
                Estimasi harga berdasarkan rata-rata pasar terdekat. Harga sebenarnya mungkin berbeda.
              </div>
              <Button type="button" variant="orange" className="w-full" leftIcon={<Share2 className="h-4 w-4" />} onClick={() => setShareOpen(true)}>Bagikan Daftar</Button>
            </div>
          </Card>
          <button type="button" className="block w-full text-left" onClick={addRecommendation}>
            <Card className="flex items-center gap-4 bg-muted-green p-4" hover={false}>
              <span className="rounded-xl bg-white p-3 text-brown-orange"><ShoppingBag className="h-5 w-5" /></span>
              <div><b>Lupa beli sesuatu?</b><p className="text-text-secondary">Tambah rekomendasi bumbu dasar.</p></div>
            </Card>
          </button>
          <Card className="food-gradient-2 min-h-44 p-5" hover={false}>
            <div className="mt-20 rounded-xl bg-white/80 p-3">
              <b>Produk Lokal Segar</b>
              <p className="text-sm text-text-secondary">Dukung petani lokal.</p>
            </div>
          </Card>
        </aside>
      </div>
      <BaseModal open={addOpen} title="Tambah Bahan Manual" onClose={() => setAddOpen(false)}>
        <div className="space-y-4">
          <Input label="Nama Bahan" value={name} onChange={(event) => setName(event.target.value)} placeholder="Contoh: Bawang merah" />
          <Select label="Kategori" value={category} onChange={(event) => setCategory(event.target.value)} options={["Karbohidrat", "Protein", "Sayur", "Bumbu"]} />
          <Input label="Jumlah" value={quantity} onChange={(event) => setQuantity(event.target.value)} placeholder="Contoh: 100g" />
          <Input label="Estimasi Harga" type="number" value={estimatedPrice} onChange={(event) => setEstimatedPrice(event.target.value)} />
          <Button type="button" className="w-full" onClick={addManualItem} disabled={!name.trim() || !quantity.trim()}>Tambah Item</Button>
        </div>
      </BaseModal>
      <ShareModal open={shareOpen} text={shareText || "Daftar belanja masih kosong."} onClose={() => setShareOpen(false)} onCopied={() => showToast("Daftar belanja berhasil disalin.")} />
    </AppShell>
  );
}
