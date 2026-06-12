"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Timer, WalletCards } from "lucide-react";
import { Card } from "@/components/ui/Card";

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId = 0;

    if (!inView) {
      frameId = requestAnimationFrame(() => setValue(0));
      return () => cancelAnimationFrame(frameId);
    }

    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [duration, inView, target]);

  return value;
}

export function HeroVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.45 });
  const nutritionScore = useCountUp(98, inView, 1100);
  const monthlySaving = useCountUp(450, inView, 1300);

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.75, y: 18 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        className="aspect-[1.05] rounded-[2rem] bg-cover bg-center shadow-soft"
        style={{ backgroundImage: "url('/assets/foods/nasi-sayur-tempe.png')" }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-5 left-4"
        initial={{ opacity: 0, x: -18, y: 18 }}
        animate={inView ? { opacity: 1, x: 0, y: [0, -8, 0] } : { opacity: 0, x: -18, y: 18 }}
        transition={{
          opacity: { duration: 0.45, delay: 0.15 },
          x: { duration: 0.45, delay: 0.15 },
          y: { duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 0.25 },
        }}
      >
        <Card className="flex items-center gap-3 p-4" hover={false}>
          <WalletCards className="h-6 w-6 text-orange" />
          <div>
            <p className="text-xs text-text-secondary">Hemat Bulanan</p>
            <b>Rp {monthlySaving}rb+</b>
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="absolute -right-3 top-5"
        initial={{ opacity: 0, x: 18, y: -18 }}
        animate={inView ? { opacity: 1, x: 0, y: [0, -10, 0] } : { opacity: 0, x: 18, y: -18 }}
        transition={{
          opacity: { duration: 0.45, delay: 0.05 },
          x: { duration: 0.45, delay: 0.05 },
          y: { duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 0.1 },
        }}
      >
        <Card className="flex items-center gap-3 p-4" hover={false}>
          <Timer className="h-6 w-6 text-primary" />
          <div>
            <p className="text-xs text-text-secondary">Skor Gizi</p>
            <b>{nutritionScore}/100</b>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
