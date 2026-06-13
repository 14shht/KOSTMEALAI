import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import { PageTransition } from "./PageTransition";

export function AppShell({ children }: { children: ReactNode }) {
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
