"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChefHat, Plus, Sparkles, UsersRound, WalletCards, X } from "lucide-react";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
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
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" },
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
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5.2 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="transform-gpu will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function PanelShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.35rem] border border-border-soft bg-white/95 p-5 shadow-card">
      {children}
    </div>
  );
}

function StockPreviewPanel() {
  const [stockItems, setStockItems] = useState(["Telur", "Tempe", "Sawi", "Beras"]);
  const [stockInput, setStockInput] = useState("");

  const addStockItem = (item: string) => {
    const cleanItem = item.trim();

    if (!cleanItem || stockItems.some((stock) => stock.toLowerCase() === cleanItem.toLowerCase())) {
      return;
    }

    setStockItems((currentItems) => [...currentItems, cleanItem].slice(0, 8));
    setStockInput("");
  };

  const removeStockItem = (item: string) => {
    setStockItems((currentItems) => currentItems.filter((stock) => stock !== item));
  };

  return (
    <PanelShell>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-black text-text-primary">Stok bahan hari ini</p>
          <p className="mt-1 text-sm font-semibold text-text-secondary">Tambah bahan yang memang ada di kost.</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-soft-green text-primary">
          <ChefHat className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <AnimatePresence initial={false}>
          {stockItems.map((item) => (
            <motion.button
              key={item}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.86, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.86, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={() => removeStockItem(item)}
              className="group inline-flex items-center gap-1.5 rounded-full bg-soft-green px-3 py-1.5 text-xs font-black text-primary transition hover:bg-primary hover:text-white"
              aria-label={`Hapus ${item}`}
            >
              {item}
              <X className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <form
        className="relative z-10 mt-4 flex items-center gap-2 rounded-2xl border border-dashed border-[#cfded0] bg-[#f8fff6] px-3 py-2.5"
        onSubmit={(event) => {
          event.preventDefault();
          addStockItem(stockInput);
        }}
      >
        <input
          value={stockInput}
          onChange={(event) => setStockInput(event.target.value)}
          placeholder="Ketik bahan, lalu klik +"
          className="min-w-0 flex-1 bg-transparent text-xs font-bold text-text-primary outline-none placeholder:text-text-secondary"
          maxLength={18}
        />
        <button
          type="button"
          onClick={() => addStockItem(stockInput)}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_6px_16px_rgba(22,29,23,0.08)] transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!stockInput.trim()}
          aria-label="Tambah stok"
        >
          <Plus className="h-4 w-4" />
        </button>
      </form>

    </PanelShell>
  );
}

export function KostSetupShowcase() {
  return (
    <div className="mt-12 overflow-hidden px-5 pb-0 pt-12 sm:px-8 lg:px-10">
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

      <div className="relative mx-auto mt-14 grid min-h-[640px] max-w-6xl gap-5 overflow-hidden lg:block">
        <FloatingPanel className="relative z-10 order-1 lg:absolute lg:left-0 lg:top-16 lg:w-56 xl:left-4" delay={0.05}>
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

        <FloatingPanel className="relative z-10 order-2 lg:absolute lg:right-0 lg:top-8 lg:w-64 xl:right-4" delay={0.14}>
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

        <div className="relative isolate z-30 order-3 mx-auto h-[570px] w-full max-w-[430px] overflow-hidden lg:order-none">
          <motion.div
            custom={0.22}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative mx-auto flex min-h-[620px] w-full max-w-[360px] flex-col rounded-[3.2rem] bg-[#0b111d] p-[3px] sm:max-w-[390px] lg:translate-y-16"
          >
            <span className="absolute -left-[5px] top-28 h-14 w-[3px] rounded-l-full bg-[#4b5563]" />
            <span className="absolute -left-[5px] top-44 h-10 w-[3px] rounded-l-full bg-[#4b5563]" />
            <span className="absolute -right-[5px] top-40 h-16 w-[3px] rounded-r-full bg-[#4b5563]" />

            <div className="relative flex flex-1 overflow-hidden rounded-[3rem] border-[8px] border-[#05070d] bg-white">
              <div className="absolute left-1/2 top-4 z-10 flex h-8 w-32 -translate-x-1/2 items-center justify-end rounded-full bg-[#05070d] pr-2.5">
                <span className="h-3 w-3 rounded-full bg-[radial-gradient(circle_at_65%_35%,#4457ff_0_12%,#111827_38%,#05070d_70%)]" />
              </div>

              <div className="mx-auto flex w-full max-w-[230px] flex-col items-center justify-center pb-16 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ delay: 0.34, duration: 0.56, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <Image
                    src="/assets/logo-mark.svg"
                    alt="KostMeal AI"
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-[1.7rem]"
                  />
                  <p className="mt-7 text-4xl font-black tracking-normal text-[#111827]">KostMeal</p>
                  <p className="mt-2 text-sm font-bold text-[#8b96a8]">AI meal planning untuk anak kost</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <FloatingPanel className="relative z-40 order-4 lg:absolute lg:bottom-8 lg:left-0 lg:w-72 xl:left-4" delay={0.25}>
          <StockPreviewPanel />
        </FloatingPanel>

        <FloatingPanel className="relative z-10 order-5 lg:absolute lg:bottom-28 lg:right-0 lg:w-72 xl:right-4" delay={0.34}>
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
          className="relative z-30 order-6 mt-3 flex justify-center lg:-mt-8"
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
