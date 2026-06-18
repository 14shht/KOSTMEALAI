"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useAuthUser } from "@/lib/hooks/use-auth-user";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  mode?: "icon" | "full";
  className?: string;
};

export function LogoutButton({ mode = "icon", className }: LogoutButtonProps) {
  const titleId = useId();
  const descriptionId = useId();
  const { authUser, logout } = useAuthUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function confirmLogout() {
    setOpen(false);
    logout();
  }

  return (
    <>
      {mode === "full" ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          leftIcon={<LogOut className="h-4 w-4" />}
          className={cn("w-full justify-start text-danger hover:bg-danger/10 hover:text-danger", className)}
          onClick={() => setOpen(true)}
        >
          Keluar
        </Button>
      ) : (
        <IconButton
          type="button"
          label="Keluar"
          icon={<LogOut className="h-5 w-5" />}
          className={cn("bg-white text-danger hover:bg-danger/10", className)}
          onClick={() => setOpen(true)}
        />
      )}

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/35 px-4 py-5 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setOpen(false)}
            onWheel={(event) => event.preventDefault()}
            onTouchMove={(event) => event.preventDefault()}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="w-full max-w-[420px] rounded-3xl border border-border-soft bg-white p-5 text-text-primary shadow-[0_24px_80px_rgba(22,29,23,0.22)] sm:p-6"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-danger/10 text-danger">
                    <LogOut className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 id={titleId} className="text-xl font-bold">
                      Keluar dari akun?
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">{authUser.displayName}</p>
                  </div>
                </div>
                <IconButton
                  type="button"
                  label="Tutup popup logout"
                  icon={<X className="h-5 w-5" />}
                  className="h-9 w-9 shrink-0 bg-soft-green"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="mt-5 rounded-2xl bg-soft-green p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p id={descriptionId} className="text-sm leading-6 text-text-secondary">
                    Sesi lokal akan dihapus dari perangkat ini. Kamu bisa masuk lagi kapan pun dengan email yang sama.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="secondary" autoFocus onClick={() => setOpen(false)}>
                  Batal
                </Button>
                <Button
                  type="button"
                  className="bg-danger text-white shadow-[0_10px_24px_rgba(220,38,38,0.22)] hover:bg-danger/90"
                  leftIcon={<LogOut className="h-4 w-4" />}
                  onClick={confirmLogout}
                >
                  Ya, Keluar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
