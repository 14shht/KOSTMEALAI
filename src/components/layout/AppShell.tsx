"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import { PageTransition } from "./PageTransition";
import { createAuthUserFromSupabaseUser, saveAuthUser } from "@/lib/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<"checking" | "authorized" | "unauthorized">("checking");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;

      if (!data.user) {
        setAuthState("unauthorized");
        router.replace("/login");
        return;
      }

      saveAuthUser(createAuthUserFromSupabaseUser(data.user));
      setAuthState("authorized");
    });

    return () => {
      active = false;
    };
  }, [router]);

  if (authState !== "authorized") return null;

  return (
    <div className="min-h-screen bg-white">
      <AppSidebar />
      <MobileHeader />
      <main className="pb-24 lg:ml-64 lg:pb-0">
        <PageTransition>
          <div className="mx-auto max-w-[1220px] px-4 py-6 sm:px-6 lg:px-10 lg:py-9">{children}</div>
        </PageTransition>
      </main>
      <MobileBottomNav />
    </div>
  );
}
