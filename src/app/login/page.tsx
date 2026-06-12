import { Sparkles, ShoppingCart } from "lucide-react";
import { AuthForm } from "@/components/forms/AuthForm";
import { PageTransition } from "@/components/layout/PageTransition";
import { Badge } from "@/components/ui/Badge";

export default function LoginPage() {
  return (
    <PageTransition>
      <main className="grid min-h-screen bg-white lg:grid-cols-2">
        <section className="auth-photo relative hidden min-h-screen items-end overflow-hidden p-12 text-white lg:flex">
          <div className="relative z-10 max-w-lg">
            <h1 className="text-4xl font-black">KostMeal AI</h1>
            <p className="mt-5 text-2xl leading-relaxed text-white/90">
              Solusi hemat makan enak buat kamu anak kos yang produktif.
              Atur budget, pilih menu, dan belanja dalam satu genggaman.
            </p>
            <div className="mt-8 flex gap-3">
              <Badge className="border border-white/20 bg-white/10 text-white normal-case"><Sparkles className="mr-2 h-4 w-4" />AI Generated Plan</Badge>
              <Badge className="border border-white/20 bg-white/10 text-white normal-case"><ShoppingCart className="mr-2 h-4 w-4" />Budget Friendly</Badge>
            </div>
          </div>
        </section>
        <section className="flex min-h-screen items-center justify-center bg-cream px-4 py-10 lg:bg-white">
          <AuthForm />
        </section>
      </main>
    </PageTransition>
  );
}
