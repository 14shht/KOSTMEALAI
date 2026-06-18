"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Mail, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Variants } from "framer-motion";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Button } from "@/components/ui/Button";
import { createAuthUser, saveAuthUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  fullName: z.string().optional(),
  confirmPassword: z.string().optional(),
});

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
    email: z.email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Konfirmasi password belum sama",
    path: ["confirmPassword"],
  });

type AuthMode = "login" | "register";
type AuthValues = z.infer<typeof loginSchema> & Partial<z.infer<typeof registerSchema>>;

const copy = {
  login: {
    splash: "Selamat Datang Kembali",
    title: "Selamat Datang Kembali",
    action: "Masuk",
    prompt: "Belum punya akun?",
    switchLabel: "Daftar",
  },
  register: {
    splash: "Mulai Hidup Sehatmu",
    title: "Mulai Hidup Sehatmu",
    action: "Buat Akun",
    prompt: "Sudah punya akun?",
    switchLabel: "Masuk",
  },
} satisfies Record<AuthMode, Record<string, string>>;

const splashVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -26, scale: 0.98 },
};

const formVariants: Variants = {
  hidden: (mode: AuthMode) => ({
    opacity: 0,
    y: mode === "login" ? 86 : 20,
    scale: mode === "login" ? 0.98 : 0.94,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.98,
    filter: "blur(6px)",
    transition: { duration: 0.22 },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.96, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: 0.08, duration: 0.48, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18 } },
};

type AuthFieldProps = {
  error?: string;
  icon: "email" | "password" | "username";
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

function AuthField({ error, icon, inputProps }: AuthFieldProps) {
  const generatedId = useId();
  const inputId = inputProps.id ?? generatedId;
  const Icon = icon === "email" ? Mail : icon === "password" ? Lock : UserRound;

  return (
    <div>
      <label
        htmlFor={inputId}
        className={cn(
          "focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_12px_32px_rgba(0,122,61,0.10)]",
          "flex h-13 w-full items-center gap-3 rounded-full border border-border-soft bg-white px-5 transition duration-300 ease-out",
          error && "border-danger/60",
        )}
      >
        <Icon className="h-5 w-5 shrink-0 text-text-secondary/70 transition-colors duration-300" aria-hidden="true" />
        <input
          {...inputProps}
          id={inputId}
          className="auth-input h-full min-w-0 flex-1 bg-transparent text-sm font-semibold text-text-primary caret-primary outline-none placeholder:text-text-secondary/55"
        />
      </label>
      {error ? <p className="mt-1.5 px-5 text-xs font-medium text-danger">{error}</p> : null}
    </div>
  );
}

function GoogleMark() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full text-base font-black text-[#4285f4]">
      G
    </span>
  );
}

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const activeSchema = useMemo(() => (mode === "login" ? loginSchema : registerSchema), [mode]);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(activeSchema),
    defaultValues: { email: "", password: "", fullName: "", confirmPassword: "" },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setShowForm(true), mode === "login" ? 920 : 660);

    return () => window.clearTimeout(timer);
  }, [mode]);

  function switchMode(nextMode: AuthMode) {
    if (nextMode === mode) return;
    clearErrors();
    reset({ email: "", password: "", fullName: "", confirmPassword: "" });
    setNotice("");
    setShowForm(false);
    setMode(nextMode);
  }

  async function onSubmit(values: AuthValues) {
    const authUser = createAuthUser({
      email: values.email,
      fullName: mode === "register" ? values.fullName : undefined,
    });

    saveAuthUser(authUser);
    router.push("/dashboard");
  }

  return (
    <div className="auth-stage relative flex h-dvh max-h-dvh w-full overflow-hidden bg-white px-5 py-7 text-text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(0,122,61,0.10)_0,transparent_28%),radial-gradient(circle_at_94%_78%,rgba(0,122,61,0.10)_0,transparent_30%)]" />

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[540px] flex-col items-center justify-center">
        <AnimatePresence mode="wait" custom={mode}>
          {!showForm ? (
            <motion.h1
              key={`${mode}-splash`}
              variants={splashVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.48, ease: "easeOut" }}
              className="text-center text-[clamp(2rem,4vw,3.25rem)] font-black leading-tight tracking-normal"
            >
              {copy[mode].splash.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-primary-light">{copy[mode].splash.split(" ").at(-1)}</span>
            </motion.h1>
          ) : (
            <motion.div
              key={`${mode}-form`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-1/2 top-7 z-20 -translate-x-1/2 sm:top-8"
              >
                <BrandLogo
                  href="/"
                  className="w-fit gap-2 text-black"
                  markClassName="h-8 w-8 rounded-xl shadow-none"
                  textClassName="text-sm font-black text-black"
                />
              </motion.div>

              <div className="mx-auto flex h-full w-full max-w-[430px] flex-col items-center justify-center">
                <motion.div
                  custom={mode}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <h1 className="text-center text-[clamp(2rem,4vw,3rem)] font-black leading-tight tracking-normal">
                    {copy[mode].title}
                  </h1>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-4">
                    <AnimatePresence>
                      {notice ? (
                        <motion.p
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="rounded-2xl bg-[#edfbea] px-4 py-3 text-center text-sm font-bold text-primary"
                        >
                          {notice}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                    <p className="text-center text-sm font-semibold text-[#738095]">Lanjutkan dengan</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full border-[#dfe3ea] bg-white/90 text-[#2c3545] shadow-[0_3px_0_rgba(20,31,52,0.08)] hover:bg-white"
                    >
                      <GoogleMark />
                      Google
                    </Button>

                    <div className="flex items-center gap-4 py-2 text-xs font-black text-[#9ba4b5]">
                      <span className="h-px flex-1 bg-[#dfe5ea]" />
                      ATAU
                      <span className="h-px flex-1 bg-[#dfe5ea]" />
                    </div>

                    <AnimatePresence initial={false}>
                      {mode === "register" ? (
                        <motion.div
                          key="username"
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -8, height: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <AuthField
                            icon="username"
                            error={errors.fullName?.message}
                            inputProps={{
                              type: "text",
                              placeholder: "Nama Lengkap",
                              autoComplete: "name",
                              ...register("fullName"),
                            }}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <AuthField
                      icon="email"
                      error={errors.email?.message}
                      inputProps={{
                        type: "email",
                        placeholder: "Email address",
                        autoComplete: "email",
                        ...register("email"),
                      }}
                    />
                    <AuthField
                      icon="password"
                      error={errors.password?.message}
                      inputProps={{
                        type: "password",
                        placeholder: "Password",
                        autoComplete: mode === "login" ? "current-password" : "new-password",
                        ...register("password"),
                      }}
                    />

                    <AnimatePresence initial={false}>
                      {mode === "register" ? (
                        <motion.div
                          key="confirm-password"
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -8, height: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <AuthField
                            icon="password"
                            error={errors.confirmPassword?.message}
                            inputProps={{
                              type: "password",
                              placeholder: "Confirm Password",
                              autoComplete: "new-password",
                              ...register("confirmPassword"),
                            }}
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      className="mt-2 h-13 w-full bg-[#52bf3f] shadow-[0_10px_20px_rgba(82,191,63,0.24)] hover:bg-[#41a931]"
                      loading={isSubmitting}
                    >
                      {copy[mode].action}
                    </Button>
                  </form>

                  <p className="mt-8 text-center text-sm font-semibold text-[#738095]">
                    {copy[mode].prompt}{" "}
                    <button
                      type="button"
                      onClick={() => switchMode(mode === "login" ? "register" : "login")}
                      className="font-black text-[#52bf3f] transition hover:text-primary"
                    >
                      {copy[mode].switchLabel}
                    </button>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
