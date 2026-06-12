"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Plus, Sparkles, UsersRound, WalletCards } from "lucide-react";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { CountUpText } from "@/components/landing/CountUpText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";

type FloatingPanelProps = {
  children: ReactNode;
  className: string;
  delay?: number;
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay, duration: 0.62, ease: "easeOut" },
  }),
};

function FloatingPanel({ children, className, delay = 0 }: FloatingPanelProps) {
  return (
    <motion.div
      custom={delay}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.6 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function PanelShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.35rem] border border-border-soft bg-white/92 p-5 shadow-soft backdrop-blur">
      {children}
    </div>
  );
}

export function KostSetupShowcase() {
  return (
    <div className="mt-12 px-5 pb-0 pt-12 sm:px-8 lg:px-10">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        className="mx-auto max-w-3xl text-center"
      >
        <Badge className="normal-case">
          <Sparkles className="mr-1 h-3 w-3" />
          KostMeal Personal Setup
        </Badge>
        <h2 className="mt-5 text-4xl font-black leading-tight text-text-primary md:text-6xl">
          Rancang Menu Kostmu
          <br />
          Sesuai <span className="inline-block rounded-full bg-primary px-5 py-1 text-white">Kondisimu</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary">
          Jawab budget, alat masak, stok kulkas, dan jadwal harian. KostMeal akan bantu susun menu hemat, daftar belanja, dan target nutrisi yang bisa kamu jalankan.
        </p>
      </motion.div>

      <div className="relative mx-auto mt-14 grid min-h-[660px] max-w-6xl gap-5 overflow-hidden lg:block lg:overflow-visible">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-primary-light/12 blur-3xl" />

        <FloatingPanel className="relative z-10 order-1 lg:absolute lg:left-8 lg:top-16 lg:w-56 xl:left-16" delay={0.05}>
          <PanelShell>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-soft-green text-primary">
              <UsersRound className="h-5 w-5" />
            </span>
            <p className="mt-5 text-3xl font-black text-text-primary">
              <CountUpText value={2500} suffix="+" />
            </p>
            <p className="mt-1 text-sm font-bold text-[#98a3b5]">anak kost pakai KostMeal</p>
          </PanelShell>
        </FloatingPanel>

        <FloatingPanel className="relative z-10 order-2 lg:absolute lg:right-0 lg:top-8 lg:w-64 xl:-right-2 2xl:-right-8" delay={0.14}>
          <PanelShell>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-soft-green text-primary">
                <WalletCards className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-text-primary">Budget hari ini</p>
                <p className="text-xs font-semibold text-text-secondary">Sisa tetap kebaca</p>
              </div>
            </div>
            <p className="mt-4 text-3xl font-black text-primary">
              <CountUpText value={35000} prefix="Rp " />
            </p>
            <ProgressBar value={72} className="mt-4" />
          </PanelShell>
        </FloatingPanel>

        <motion.div
          custom={0.22}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="relative z-20 order-3 mx-auto flex min-h-[520px] w-full max-w-[320px] flex-col rounded-[2.5rem] border-[9px] border-[#111827] bg-white p-3 shadow-[0_36px_100px_rgba(22,29,23,0.22)] sm:max-w-[340px] lg:order-none"
        >
          <div className="mx-auto mb-4 h-4 w-20 rounded-full bg-[#111827]" />
          <div className="flex flex-1 flex-col rounded-[1.8rem] bg-[#f4fbef] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black uppercase text-primary">Plan aktif</p>
                <h3 className="mt-1 text-xl font-black text-text-primary">Kos Hemat Pro</h3>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
                <ChefHat className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Budget", 72, "Rp 35rb/hari"],
                ["Protein", 64, "telur + tempe"],
                ["Waktu", 58, "15-20 menit"],
              ].map(([label, value, detail], index) => (
                <div key={label} className="rounded-2xl bg-white p-3 shadow-[0_8px_22px_rgba(22,29,23,0.04)]">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-black text-text-primary">{label}</span>
                    <span className="text-text-secondary">{detail}</span>
                  </div>
                  <ProgressBar value={Number(value)} delay={index * 0.12} barClassName={index === 1 ? "bg-orange" : "bg-primary"} />
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-3 shadow-[0_8px_22px_rgba(22,29,23,0.04)]">
              <p className="text-xs font-black uppercase text-text-secondary">Belanja hari ini</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Telur", "Tempe", "Sawi", "Beras"].map((item) => (
                  <span key={item} className="rounded-full bg-soft-green px-2.5 py-1 text-[11px] font-bold text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <FloatingPanel className="relative z-10 order-4 lg:absolute lg:bottom-24 lg:left-6 lg:w-72 xl:left-12" delay={0.25}>
          <PanelShell>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-black text-text-primary">Stok bahan hari ini</p>
                <p className="mt-1 text-sm font-semibold text-text-secondary">Pilih bahan yang sudah ada.</p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-soft-green text-primary">
                <ChefHat className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Telur", "Tempe", "Sawi", "Beras"].map((item) => (
                <span key={item} className="rounded-full bg-soft-green px-3 py-1.5 text-xs font-black text-primary">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-[#cfded0] bg-[#f8fff6] px-4 py-3">
              <span className="text-xs font-bold text-text-secondary">Tambah stok lain</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-primary shadow-[0_6px_16px_rgba(22,29,23,0.08)]">
                <Plus className="h-4 w-4" />
              </span>
            </div>
          </PanelShell>
        </FloatingPanel>

        <FloatingPanel className="relative z-10 order-5 lg:absolute lg:bottom-28 lg:right-0 lg:w-72 xl:-right-4 2xl:-right-10" delay={0.34}>
          <PanelShell>
            <div className="mb-4 flex items-center justify-between border-b border-border-soft pb-4">
              <p className="text-lg font-black text-text-primary">Ringkasan menu</p>
              <span className="rounded-full bg-soft-green px-3 py-1 text-xs font-black text-primary">3 hari</span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Senin", "Nasi telur sawi", "Rp 13rb"],
                ["Selasa", "Tempe orek bowl", "Rp 11rb"],
                ["Rabu", "Sup telur rice cooker", "Rp 15rb"],
              ].map(([day, menu, price]) => (
                <div key={day} className="grid grid-cols-[52px_1fr_auto] items-center gap-3">
                  <span className="font-bold text-text-secondary">{day}</span>
                  <span className="font-black text-text-primary">{menu}</span>
                  <span className="font-bold text-primary">{price}</span>
                </div>
              ))}
            </div>
          </PanelShell>
        </FloatingPanel>

        <motion.div
          variants={reveal}
          custom={0.42}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="relative z-20 order-6 mt-3 flex justify-center lg:mt-10"
        >
          <Link href="/login">
            <Button className="px-8" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Mulai Setup Kost
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
