"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { AuthUser } from "@/lib/auth";

type DashboardGreetingProps = {
  authUser: AuthUser;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 19) return "Selamat sore";
  return "Selamat malam";
}

function getDateLabel() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date());
}

export function DashboardGreeting({ authUser }: DashboardGreetingProps) {
  const [dateLabel, setDateLabel] = useState("Hari ini");
  const [greeting, setGreeting] = useState("Halo");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDateLabel(getDateLabel());
      setGreeting(getGreeting());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.section
      className="mb-7 rounded-2xl border border-border-soft bg-white px-5 py-5 shadow-[0_16px_46px_rgba(22,29,23,0.045)] sm:px-6 sm:py-6 lg:px-7"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <motion.div
            className="mb-3 flex flex-wrap items-center gap-2 text-sm font-medium text-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.28 }}
          >
            <span>{greeting}</span>
            <span className="h-1 w-1 rounded-full bg-border-soft" />
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-primary" />
              {dateLabel}
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl font-black leading-tight tracking-normal text-text-primary sm:text-4xl lg:text-[2.75rem]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.34, ease: "easeOut" }}
          >
            Halo, {authUser.displayName}
          </motion.h1>

          <motion.p
            className="mt-3 max-w-2xl text-base leading-7 text-text-secondary"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.32 }}
          >
            Masakan rumahan hemat energi untuk hari ini, tetap enak dan ramah budget.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col gap-3 border-t border-border-soft pt-4 md:min-w-[220px] md:items-end md:border-t-0 md:pt-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.32 }}
        >
          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Fokus: masak hemat</span>
          </div>
          <Link href="/generate-plan" className="w-full md:w-auto">
            <Button className="h-11 w-full px-5 md:w-auto" rightIcon={<Sparkles className="h-4 w-4" />}>
              Buat Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
