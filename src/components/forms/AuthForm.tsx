"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type AuthValues = z.infer<typeof schema>;

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="w-full max-w-[480px] rounded-2xl border border-border-soft bg-white p-7 shadow-card sm:p-8">
      <div className="grid grid-cols-2 rounded-full bg-soft-green p-1">
        {(["login", "register"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={cn(
              "rounded-full py-3 font-semibold transition",
              mode === item ? "bg-primary text-white shadow-card" : "text-text-secondary",
            )}
          >
            {item === "login" ? "Masuk" : "Daftar"}
          </button>
        ))}
      </div>

      <h1 className="mt-9 text-2xl font-bold text-text-primary">
        {mode === "login" ? "Selamat Datang Kembali" : "Mulai Hidup Lebih Hemat"}
      </h1>
      <p className="mt-2 text-text-secondary">Yuk, lanjut rapihin rencana makan kamu.</p>

      <form onSubmit={handleSubmit(async () => router.push("/dashboard"))} className="mt-8 space-y-5">
        <div>
          <Input label="Email" type="email" placeholder="nama@email.com" {...register("email")} />
          {errors.email ? <p className="mt-1 text-sm text-danger">{errors.email.message}</p> : null}
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-text-secondary">Password</span>
            <button type="button" className="font-medium text-primary">Lupa Password?</button>
          </div>
          <input
            aria-label="Password"
            type="password"
            placeholder="••••••••"
            className="focus-soft h-13 w-full rounded-full border border-border-soft bg-white px-5"
            {...register("password")}
          />
          {errors.password ? <p className="mt-1 text-sm text-danger">{errors.password.message}</p> : null}
        </div>
        <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
          {mode === "login" ? "Masuk Ke Akun" : "Daftar Akun"}
        </Button>
      </form>

      <div className="my-7 flex items-center gap-4 text-sm text-text-secondary">
        <span className="h-px flex-1 bg-border-soft" />
        Atau pakai cara lain
        <span className="h-px flex-1 bg-border-soft" />
      </div>
      <Button variant="outline" className="w-full text-text-primary">
        <span className="text-lg font-bold text-[#4285f4]">G</span> Masuk dengan Google
      </Button>
      <p className="mt-7 text-center text-xs text-text-secondary">
        Dengan melanjutkan, kamu setuju dengan <b className="text-primary">Ketentuan Layanan</b> &{" "}
        <b className="text-primary">Kebijakan Privasi</b> kami.
      </p>
    </div>
  );
}
