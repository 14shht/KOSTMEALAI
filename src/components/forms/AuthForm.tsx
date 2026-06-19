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
import { createAuthUserFromSupabaseUser, saveAuthUser } from "@/lib/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
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

function getSetupCompleted(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return window.localStorage.getItem(`kostmeal.profileSetup.completed.${normalizedEmail}`) === "true"
    || window.localStorage.getItem("kostmeal.profileSetup.completed") === "true";
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.8 3.1-4.3 3.1-7.4Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.2 13.7A6 6 0 0 1 5.9 12c0-.6.1-1.2.3-1.7V7.7H2.9A10 10 0 0 0 2 12c0 1.6.4 3.1.9 4.3l3.3-2.6Z" />
      <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.8C17 3 14.7 2 12 2A10 10 0 0 0 2.9 7.7l3.3 2.6C7 7.8 9.3 6 12 6Z" />
    </svg>
  );
}

function GoogleSignInButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-12 w-full justify-center border-[#dadce0] bg-white px-4 text-[#202124] shadow-[0_1px_2px_rgba(60,64,67,0.18)] hover:border-[#c4c7c5] hover:bg-[#f8fafd] hover:shadow-[0_1px_3px_rgba(60,64,67,0.28)]"
      loading={loading}
      leftIcon={<GoogleMark />}
      onClick={onClick}
    >
      Google
    </Button>
  );
}

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const activeSchema = useMemo(() => (mode === "login" ? loginSchema : registerSchema), [mode]);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
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
    const normalizedEmail = values.email.trim().toLowerCase();
    const supabase = createSupabaseBrowserClient();

    if (mode === "register") {
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: values.password,
        options: {
          data: {
            fullName: values.fullName,
          },
        },
      });

      if (error) {
        setError("email", { type: "manual", message: error.message });
        return;
      }

      if (data.session) {
        await supabase.auth.signOut();
      }

      clearErrors();
      reset({ email: normalizedEmail, password: "", fullName: "", confirmPassword: "" });
      setShowForm(false);
      setMode("login");
      setNotice("Akun berhasil dibuat. Cek email kamu untuk verifikasi, lalu masuk.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: values.password,
    });

    if (error || !data.user) {
      setError("password", { type: "manual", message: "Email atau password salah, atau akun belum terdaftar." });
      return;
    }

    saveAuthUser(createAuthUserFromSupabaseUser(data.user));
    router.push(!getSetupCompleted(normalizedEmail) ? "/profile/setup" : "/dashboard");
  }

  async function continueWithGoogle() {
    setIsGoogleLoading(true);
    setNotice("");

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profile/setup`,
      },
    });

    if (error) {
      setNotice(error.message);
      setIsGoogleLoading(false);
      return;
    }
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
                    <GoogleSignInButton loading={isGoogleLoading} onClick={continueWithGoogle} />

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
