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

export function useAuthUser() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUser>(fallbackUser);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAuthUser(getAuthUser() ?? fallbackUser);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function setUser(input: AuthUser | { email: string; fullName?: string }) {
    const nextUser = "displayName" in input ? input : createAuthUser(input);

    saveAuthUser(nextUser);
    setAuthUser(nextUser);
  }

  function logout() {
    clearAuthUser();
    setAuthUser(fallbackUser);
    router.push("/login");
  }

  return { authUser, setUser, logout };
}
