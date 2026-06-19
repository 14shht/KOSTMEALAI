import { Suspense } from "react";
import { AuthForm } from "@/components/forms/AuthForm";

export default function LoginPage() {
  return (
    <main className="h-dvh overflow-hidden">
      <Suspense fallback={null}>
        <AuthForm />
      </Suspense>
    </main>
  );
}
