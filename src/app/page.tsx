import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, PlayCircle, Sparkles, Star, Timer, WalletCards } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function LandingPage() {
  return (
    <PageTransition>
      <PublicNavbar />
      <main>
        <section className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <Badge className="normal-case"><Sparkles className="mr-1 h-3 w-3" />AI-Powered Meal Planning</Badge>
            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight text-text-primary sm:text-5xl lg:text-6xl">
              Makan Sehat, Budget Tetap Waras
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-text-secondary">
              Solusi cerdas anak kos untuk merancang menu mingguan yang bergizi tanpa bikin dompet menangis.
              Biarkan AI kami yang menghitung kalorinya.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard"><Button rightIcon={<ArrowRight className="h-4 w-4" />} className="w-full sm:w-auto">Mulai Sekarang</Button></Link>
              <Button variant="secondary" leftIcon={<PlayCircle className="h-4 w-4" />} className="w-full sm:w-auto">Lihat Demo</Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-text-secondary">
              <div className="flex -space-x-2">
                {["A", "K", "F"].map((item) => (
                  <span key={item} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-primary-light font-bold text-primary-dark">{item}</span>
                ))}
              </div>
              Bergabung dengan <b className="text-primary">2.500+</b> anak kos hemat lainnya
            </div>
          </div>
          <div className="relative">
            <div className="food-gradient-1 aspect-[1.05] rounded-[2rem] shadow-soft" />
            <Card className="absolute -bottom-5 left-4 flex items-center gap-3 p-4">
              <WalletCards className="h-6 w-6 text-orange" />
              <div><p className="text-xs text-text-secondary">Hemat Bulanan</p><b>Rp 450rb+</b></div>
            </Card>
            <Card className="absolute -right-3 top-5 flex items-center gap-3 p-4">
              <Timer className="h-6 w-6 text-primary" />
              <div><p className="text-xs text-text-secondary">Skor Gizi</p><b>98/100</b></div>
            </Card>
          </div>
        </section>

        <section id="fitur" className="bg-soft-green py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Fitur Unggulan KostMeal</h2>
              <p className="mt-3 text-text-secondary">Dirancang khusus untuk menyesuaikan gaya hidup sibuk namun tetap ingin menjaga kesehatan dan anggaran.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Card className="p-8 md:col-span-2">
                <Sparkles className="h-10 w-10 rounded-xl bg-primary p-2 text-white" />
                <h3 className="mt-6 text-2xl font-bold">AI Meal Generator</h3>
                <p className="mt-3 max-w-md text-text-secondary">Generate rencana makan mingguan berdasarkan budget harianmu. AI kami memastikan variasi menu agar tidak bosan.</p>
                <div className="mt-6 rounded-2xl bg-soft-green p-4 md:ml-auto md:max-w-sm">
                  <div className="flex justify-between text-sm font-semibold"><span>Hari ini</span><span className="text-primary">Saran AI</span></div>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-xl bg-white p-3">Nasi Gila Hemat <span className="text-xs text-text-secondary">Rp 12.500 • 450 kkal</span></div>
                    <div className="rounded-xl bg-white p-3">Tumis Bayam Telur <span className="text-xs text-text-secondary">Rp 8.000 • 320 kkal</span></div>
                  </div>
                </div>
              </Card>
              <Card className="p-8">
                <WalletCards className="h-10 w-10 rounded-xl bg-orange/20 p-2 text-brown-orange" />
                <h3 className="mt-6 text-xl font-bold">Smart Shopping List</h3>
                <p className="mt-4 text-text-secondary">Daftar belanja otomatis yang dikelompokkan berdasarkan lorong pasar untuk efisiensi waktu.</p>
              </Card>
              <Card className="p-8">
                <Timer className="h-10 w-10 rounded-xl bg-orange/20 p-2 text-brown-orange" />
                <h3 className="mt-6 text-xl font-bold">Nutrient Tracker</h3>
                <p className="mt-4 text-text-secondary">Pantau asupan kalori, protein, dan lemak harianmu secara visual dan intuitif.</p>
                <ProgressBar value={78} className="mt-6" />
              </Card>
              <Card className="bg-primary p-8 text-white md:col-span-2">
                <h3 className="text-2xl font-bold">Komunitas Anak Kos</h3>
                <p className="mt-4 max-w-lg text-white/80">Bagikan resep kreasi mu dan lihat apa yang dimasak oleh penghuni kos lain di sekitarmu.</p>
                <Button variant="secondary" size="sm" className="mt-6">Jelajahi Resep</Button>
              </Card>
            </div>
          </div>
        </section>

        <section id="resep" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div className="self-center">
            <h2 className="text-3xl font-bold">Detail Nutrisi di Setiap Gigitan</h2>
            <p className="mt-5 text-text-secondary">KostMeal memberikan rincian mikronutrisi agar performa belajarmu tetap maksimal walau akhir bulan.</p>
            <div className="mt-8 space-y-4">
              {["Estimasi Harga Akurat", "Langkah Memasak Praktis"].map((item) => (
                <p key={item} className="flex gap-3 text-text-secondary"><CheckCircle2 className="h-5 w-5 text-primary" /><b className="text-text-primary">{item}</b></p>
              ))}
            </div>
          </div>
          <Card className="mx-auto w-full max-w-md overflow-hidden">
            <div className="food-gradient-2 h-64" />
            <div className="p-6">
              <div className="flex justify-between"><div><h3 className="text-2xl font-bold">Super Quinoa Bowl</h3><p className="text-sm text-primary">Estimasi biaya: Rp 18.000</p></div><Heart className="h-6 w-6" /></div>
              <div className="mt-6 grid grid-cols-4 gap-3 text-center text-xs font-bold text-text-secondary">
                <span>450<br />Kalori</span><span>18g<br />Protein</span><span>64g<br />Karbo</span><span>22g<br />Lemak</span>
              </div>
              <Button variant="orange" className="mt-6 w-full">Tambah ke Jadwal</Button>
            </div>
          </Card>
        </section>

        <section className="bg-soft-green py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <p className="text-center text-sm font-bold uppercase text-primary">Kata Mereka</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {["Rian, Mahasiswa", "Sinta, Freelancer", "Andi, Karyawan"].map((name) => (
                <Card key={name} className="p-7">
                  <div className="flex text-orange">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                  <p className="mt-4 text-text-secondary">
                    &ldquo;Berkat KostMeal, saya bisa nabung lebih banyak buat beli gadget baru tanpa harus kelaparan.&rdquo;
                  </p>
                  <b className="mt-5 block">{name}</b>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="harga" className="px-4 py-16 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-primary-light px-6 py-16 text-center text-primary-dark">
            <h2 className="text-3xl font-black md:text-5xl">Siap Untuk Hidup Lebih Sehat & Hemat?</h2>
            <p className="mx-auto mt-5 max-w-xl">Bergabunglah dengan ribuan anak kos lainnya dan mulai petualangan kuliner hematmu hari ini.</p>
            <Link href="/login"><Button className="mt-8">Daftar Sekarang - Gratis!</Button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
