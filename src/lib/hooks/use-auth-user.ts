"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthUser, createAuthUser, getAuthUser, saveAuthUser, type AuthUser } from "@/lib/auth";

const fallbackUser: AuthUser = {
  email: "faiq@example.com",
  displayName: "Faiq",
  initials: "F",
  membership: "Akun KostMeal",
};

export const authUserChangedEvent = "kostmeal.auth.changed";

export function useAuthUser() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUser>(fallbackUser);

  useEffect(() => {
    const syncUser = () => {
      setAuthUser(getAuthUser() ?? fallbackUser);
    };
    const timer = window.setTimeout(syncUser, 0);
    window.addEventListener(authUserChangedEvent, syncUser);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(authUserChangedEvent, syncUser);
    };
  }, []);

  function setUser(input: AuthUser | { email: string; fullName?: string }) {
    const nextUser = "displayName" in input ? input : createAuthUser(input);

    saveAuthUser(nextUser);
    setAuthUser(nextUser);
    window.dispatchEvent(new Event(authUserChangedEvent));
  }

  function logout() {
    clearAuthUser();
    setAuthUser(fallbackUser);
    router.push("/login");
  }

  return { authUser, setUser, logout };
}
