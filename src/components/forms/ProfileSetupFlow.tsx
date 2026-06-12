"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Banknote, ChefHat, Clock3, Home, Snowflake, Target } from "lucide-react";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SetupData = {
  budget: string;
  cookingTool: string;
  storage: string;
  schedule: string;
  goal: string;
};

const steps = [
  {
    eyebrow: "PERTANYAAN 1/5",
    title: "Budget Makan Harian",
    helper: "Biar menu yang keluar realistis buat kantong anak kost.",
  },
  {
    eyebrow: "PERTANYAAN 2/5",
    title: "Alat Masak di Kost",
    helper: "KostMeal bakal menyesuaikan resep dengan alat yang ada.",
  },
  {
    eyebrow: "PERTANYAAN 3/5",
    title: "Penyimpanan Makanan",
    helper: "Ini membantu rekomendasi belanja dan meal prep.",
  },
  {
    eyebrow: "PERTANYAAN 4/5",
    title: "Ritme Harian Kamu",
    helper: "Pilih yang paling mendekati jadwal kuliah atau kerja.",
  },
  {
    eyebrow: "PERTANYAAN 5/5",
    title: "Prioritas Makan",
    helper: "Kita pakai ini buat menyusun menu yang paling kepakai.",
  },
];

const budgetOptions = [
  "Di bawah Rp20.000 / hari",
  "Rp20.000 - Rp35.000 / hari",
  "Rp35.000 - Rp50.000 / hari",
  "Fleksibel asal sehat",
];

const cookingToolOptions = [
  "Rice cooker saja",
  "Kompor atau electric stove",
  "Microwave / air fryer",
  "Tidak masak, lebih sering beli",
];

const storageOptions = [
  "Ada kulkas pribadi",
  "Kulkas bersama",
  "Tidak ada kulkas",
  "Sering stok lauk kering",
];

const scheduleOptions = [
  "Pagi padat, butuh sarapan cepat",
  "Sering pulang malam",
  "Waktu masak cuma akhir pekan",
  "Jadwal cukup fleksibel",
];

const goalOptions = [
  "Makan hemat tapi tetap kenyang",
  "Menu sehat tanpa ribet",
  "Banyak protein dengan budget aman",
  "Meal prep 2-3 hari sekali",
];

const screenVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.985,
    filter: "blur(8px)",
    transition: { duration: 0.22, ease: "easeInOut" },
  },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.045, duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SetupProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="mx-auto flex w-full max-w-[620px] gap-2.5 px-2 sm:gap-3">
      {steps.map((step, index) => (
        <motion.span
          key={step.eyebrow}
          initial={false}
          animate={{
            backgroundColor: index <= currentStep ? "#52bf3f" : "#e3e7ed",
            scaleX: index <= currentStep ? 1 : 0.96,
          }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="h-2.5 flex-1 origin-left rounded-full"
        />
      ))}
    </div>
  );
}

function ChoiceButton({
  active,
  children,
  icon,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-soft flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-2 bg-white/88 px-5 py-3 text-center text-xs font-black uppercase leading-snug text-[#98a3b5] shadow-[0_4px_0_rgba(18,27,43,0.08)] transition duration-300 sm:text-sm",
        active && "border-[#63d266] bg-[#f3fff4] text-[#2fa93c] shadow-[0_0_0_5px_rgba(99,210,102,0.15),0_8px_18px_rgba(35,154,53,0.12)]",
      )}
    >
      {icon}
      <span className="min-w-0">{children}</span>
    </button>
  );
}

export function ProfileSetupFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<SetupData>({
    budget: "",
    cookingTool: "",
    storage: "",
    schedule: "",
    goal: "",
  });

  const canContinue = useMemo(() => {
    if (currentStep === 0) return Boolean(data.budget);
    if (currentStep === 1) return Boolean(data.cookingTool);
    if (currentStep === 2) return Boolean(data.storage);
    if (currentStep === 3) return Boolean(data.schedule);
    return Boolean(data.goal);
  }, [currentStep, data]);

  function updateData(key: keyof SetupData, value: string) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function goNext() {
    if (!canContinue) return;
    if (currentStep === steps.length - 1) {
      router.push("/dashboard");
      return;
    }
    setCurrentStep((step) => step + 1);
  }

  function goBack() {
    if (currentStep === 0) {
      router.push("/login");
      return;
    }
    setCurrentStep((step) => step - 1);
  }

  const step = steps[currentStep];

  return (
    <div className="relative flex h-dvh max-h-dvh w-full overflow-hidden bg-[#fbfffc] px-5 py-7 text-[#121827]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 7% 18%, rgba(99,210,102,0.28) 0, rgba(99,210,102,0.15) 13%, transparent 32%), radial-gradient(circle at 94% 78%, rgba(99,210,102,0.30) 0, rgba(99,210,102,0.16) 15%, transparent 37%), radial-gradient(circle at 67% 54%, rgba(99,210,102,0.11) 0, transparent 24%)",
            "radial-gradient(circle at 9% 20%, rgba(99,210,102,0.24) 0, rgba(99,210,102,0.13) 14%, transparent 34%), radial-gradient(circle at 92% 75%, rgba(99,210,102,0.33) 0, rgba(99,210,102,0.17) 16%, transparent 38%), radial-gradient(circle at 64% 58%, rgba(99,210,102,0.13) 0, transparent 25%)",
            "radial-gradient(circle at 7% 18%, rgba(99,210,102,0.28) 0, rgba(99,210,102,0.15) 13%, transparent 32%), radial-gradient(circle at 94% 78%, rgba(99,210,102,0.30) 0, rgba(99,210,102,0.16) 15%, transparent 37%), radial-gradient(circle at 67% 54%, rgba(99,210,102,0.11) 0, transparent 24%)",
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.62)_0%,rgba(255,255,255,0.97)_40%,rgba(255,255,255,0.72)_100%)]" />

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[900px] flex-col">
        <div className="grid h-12 grid-cols-[48px_1fr_48px] items-center">
          <button
            type="button"
            onClick={goBack}
            aria-label="Kembali"
            className="grid h-10 w-10 place-items-center rounded-full text-[#121827] transition hover:bg-white/80 hover:shadow-[0_8px_20px_rgba(18,24,39,0.08)]"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <SetupProgress currentStep={currentStep} />
        </div>

        <div className="mx-auto flex min-h-0 w-full max-w-[560px] flex-1 flex-col items-center justify-center overflow-y-auto pb-4 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              <p className="text-center text-sm font-black text-[#007a3d]">{step.eyebrow}</p>
              <h1 className="mt-3 text-center text-[clamp(2rem,4vw,3.2rem)] font-black leading-tight tracking-normal">
                {step.title}
              </h1>
              <p className="mt-4 text-center text-sm font-bold text-[#697589]">{step.helper}</p>

              <div className="mt-8 space-y-4">
                {currentStep === 0 ? (
                  budgetOptions.map((option, index) => (
                    <motion.div key={option} custom={index} variants={fieldVariants} initial="hidden" animate="visible">
                      <ChoiceButton
                        active={data.budget === option}
                        icon={<Banknote className="h-4 w-4" />}
                        onClick={() => updateData("budget", option)}
                      >
                        {option}
                      </ChoiceButton>
                    </motion.div>
                  ))
                ) : null}

                {currentStep === 1
                  ? cookingToolOptions.map((option, index) => (
                      <motion.div key={option} custom={index} variants={fieldVariants} initial="hidden" animate="visible">
                        <ChoiceButton
                          active={data.cookingTool === option}
                          icon={option.includes("Tidak") ? <Home className="h-4 w-4" /> : <ChefHat className="h-4 w-4" />}
                          onClick={() => updateData("cookingTool", option)}
                        >
                          {option}
                        </ChoiceButton>
                      </motion.div>
                    ))
                  : null}

                {currentStep === 2
                  ? storageOptions.map((option, index) => (
                      <motion.div key={option} custom={index} variants={fieldVariants} initial="hidden" animate="visible">
                        <ChoiceButton
                          active={data.storage === option}
                          icon={<Snowflake className="h-4 w-4" />}
                          onClick={() => updateData("storage", option)}
                        >
                          {option}
                        </ChoiceButton>
                    </motion.div>
                    ))
                  : null}

                {currentStep === 3
                  ? scheduleOptions.map((option, index) => (
                      <motion.div key={option} custom={index} variants={fieldVariants} initial="hidden" animate="visible">
                        <ChoiceButton
                          active={data.schedule === option}
                          icon={<Clock3 className="h-4 w-4" />}
                          onClick={() => updateData("schedule", option)}
                        >
                          {option}
                        </ChoiceButton>
                      </motion.div>
                    ))
                  : null}

                {currentStep === 4
                  ? goalOptions.map((option, index) => (
                      <motion.div key={option} custom={index} variants={fieldVariants} initial="hidden" animate="visible">
                        <ChoiceButton
                          active={data.goal === option}
                          icon={<Target className="h-4 w-4" />}
                          onClick={() => updateData("goal", option)}
                        >
                          {option}
                        </ChoiceButton>
                      </motion.div>
                    ))
                  : null}
              </div>

              <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible">
                <Button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue}
                  className="mt-10 h-14 w-full bg-[#52bf3f] font-black shadow-[0_12px_22px_rgba(82,191,63,0.26)] hover:bg-[#42ad35]"
                >
                  {currentStep === steps.length - 1 ? "Selesai" : "Lanjut"}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
