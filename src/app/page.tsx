import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  MessageCircleHeart,
  Moon,
  PlayCircle,
  ReceiptText,
  Sparkles,
  Star,
  Sun,
  UserRound,
  UsersRound,
} from "lucide-react";
import { CountUpText } from "@/components/landing/CountUpText";
import { HeroVisual } from "@/components/landing/HeroVisual";
import { KostSetupShowcase } from "@/components/landing/KostSetupShowcase";
import { ScheduleMealCard } from "@/components/landing/ScheduleMealCard";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function LandingPage() {
  const testimonials = [
    {
      name: "Rian",
      role: "Mahasiswa Teknik",
      quote: "Dulu akhir bulan cuma mie instan. Sekarang masih bisa makan ayam, telur, sayur, dan budget tetap kebaca.",
      saved: 185000,
      tag: "Rice cooker team",
    },
    {
      name: "Sinta",
      role: "Freelancer",
      quote: "Shopping list-nya bikin belanja nggak random. Aku jadi tahu bahan mana yang bisa dipakai buat beberapa menu.",
      saved: 142000,
      tag: "Meal prep 3 hari",
    },
    {
      name: "Andi",
      role: "Karyawan rantau",
      quote: "Pulang kerja biasanya beli asal. Sekarang menu malam sudah kebayang dan estimasi harganya masuk akal.",
      saved: 210000,
      tag: "Pulang malam",
    },
  ];

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
              Bergabung dengan <b className="text-primary"><CountUpText value={2500} suffix="+" /></b> anak kos hemat lainnya
            </div>
          </div>
          <HeroVisual />
        </section>

        <section id="fitur" className="bg-white py-16">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-5">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-black tracking-normal">Fitur Unggulan KostMeal</h2>
              <p className="mt-3 leading-6 text-text-secondary">Dirancang khusus untuk menyesuaikan gaya hidup sibuk namun tetap ingin menjaga kesehatan dan anggaran.</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-12">
              <Card className="rounded-[1.25rem] p-7 shadow-soft md:col-span-8 md:p-8">
                <div className="grid h-full gap-8 md:grid-cols-[1fr_0.95fr] md:items-center">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="mt-8 text-2xl font-bold leading-tight">AI Meal Generator</h3>
                    <p className="mt-5 max-w-sm leading-7 text-text-secondary">
                      Generate rencana makan mingguan berdasarkan budget harianmu. AI kami memastikan variasi menu agar tidak bosan.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border-soft bg-soft-green p-4">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Hari ini</span>
                      <span className="text-primary">Saran AI</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-3 rounded-xl bg-white p-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/15 text-brown-orange">
                          <Sun className="h-5 w-5" />
                        </span>
                        <span>
                          <b className="block text-sm">Nasi Gila Hemat</b>
                          <span className="text-xs text-text-secondary">
                            <CountUpText value={12500} prefix="Rp " /> &bull; <CountUpText value={450} suffix=" kkal" />
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-white p-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Moon className="h-5 w-5" />
                        </span>
                        <span>
                          <b className="block text-sm">Tumis Bayam Telur</b>
                          <span className="text-xs text-text-secondary">
                            <CountUpText value={8000} prefix="Rp " /> &bull; <CountUpText value={320} suffix=" kkal" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[1.25rem] p-7 shadow-soft md:col-span-4 md:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brown-orange text-white">
                  <ReceiptText className="h-5 w-5" />
                </div>
                <h3 className="mt-7 text-2xl font-bold leading-tight">Smart Shopping List</h3>
                <p className="mt-5 leading-7 text-text-secondary">
                  Daftar belanja otomatis yang dikelompokkan berdasarkan lorong pasar untuk efisiensi waktu.
                </p>
                <div className="mt-8 border-t border-border-soft pt-7">
                  <p className="flex items-center gap-2 text-xs text-text-secondary">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Beras <CountUpText value={1} suffix="kg" />
                  </p>
                </div>
              </Card>

              <Card className="rounded-[1.25rem] p-7 shadow-soft md:col-span-4 md:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brown-orange text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="mt-7 text-2xl font-bold leading-tight">Nutrient Tracker</h3>
                <p className="mt-5 leading-7 text-text-secondary">
                  Pantau asupan kalori, protein, dan lemak harianmu secara visual dan intuitif.
                </p>
                <div className="mt-8">
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span>Protein</span>
                    <span><CountUpText value={45} />/<CountUpText value={60} suffix="g" /></span>
                  </div>
                  <ProgressBar value={78} />
                </div>
              </Card>

              <Card className="overflow-hidden rounded-[1.25rem] bg-primary p-7 text-white shadow-soft md:col-span-8 md:p-8">
                <div className="flex h-full flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">Komunitas Anak Kos</h3>
                    <p className="mt-5 max-w-sm leading-7 text-white/85">
                      Bagikan resep kreasi mu dan lihat apa yang dimasak oleh penghuni kos lain di sekitarmu.
                    </p>
                    <Button variant="secondary" size="sm" className="mt-6 px-6 text-primary">Jelajahi Resep</Button>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-28 w-24 items-center justify-center rounded-xl bg-white/18 text-white">
                      <UserRound className="h-8 w-8" />
                    </div>
                    <div className="flex h-28 w-24 items-center justify-center rounded-xl bg-white/18 text-white">
                      <UsersRound className="h-8 w-8" />
                    </div>
                  </div>
                </div>
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
          <ScheduleMealCard />
        </section>

        <section id="harga" className="bg-white px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <Badge className="normal-case">
                  <MessageCircleHeart className="mr-1 h-3 w-3" />
                  Cerita Anak Kost
                </Badge>
                <h2 className="mt-5 max-w-lg text-3xl font-black leading-tight text-text-primary md:text-5xl">
                  Bukan cuma sehat, tapi belanja mingguan jadi lebih jelas.
                </h2>
                <p className="mt-5 max-w-md leading-7 text-text-secondary">
                  KostMeal paling berguna saat pilihan makan harus realistis: alat masak terbatas, kulkas bareng, dan budget harian perlu dijaga.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border-soft bg-soft-green p-5">
                  <p className="text-xs font-bold uppercase text-text-secondary">Rata-rata hemat</p>
                  <p className="mt-3 text-3xl font-black text-primary">
                    <CountUpText value={179000} prefix="Rp " />
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">per bulan dari menu lebih terencana</p>
                </div>
                <div className="rounded-2xl border border-border-soft bg-[#fff7ed] p-5">
                  <p className="text-xs font-bold uppercase text-text-secondary">Menu cepat</p>
                  <p className="mt-3 text-3xl font-black text-brown-orange">
                    <CountUpText value={18} suffix=" menit" />
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">estimasi masak untuk hari sibuk</p>
                </div>
                <div className="rounded-2xl border border-border-soft bg-white p-5 shadow-card">
                  <p className="text-xs font-bold uppercase text-text-secondary">Budget aman</p>
                  <p className="mt-3 text-3xl font-black text-text-primary">
                    <CountUpText value={35} suffix="rb" />
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">target makan harian anak kost</p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <Card key={item.name} className="overflow-hidden p-0">
                  <div className="border-b border-border-soft bg-soft-green/70 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">{item.tag}</span>
                      <div className="flex text-orange">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="min-h-[112px] leading-7 text-text-secondary">&ldquo;{item.quote}&rdquo;</p>
                    <div className="mt-6 flex items-end justify-between gap-4">
                      <div>
                        <b className="block text-text-primary">{item.name}</b>
                        <span className="text-sm text-text-secondary">{item.role}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase text-text-secondary">Hemat</p>
                        <p className="font-black text-primary">
                          <CountUpText value={item.saved} prefix="Rp " />
                        </p>
                      </div>
                    </div>
                    <ProgressBar value={[72, 58, 84][index]} className="mt-5" delay={index * 0.1} />
                  </div>
                </Card>
              ))}
            </div>

            <KostSetupShowcase />
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
