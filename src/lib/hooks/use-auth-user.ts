"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearAuthUser,
  createAuthUser,
  createAuthUserFromSupabaseUser,
  getAuthUser,
  saveAuthUser,
  type AuthUser,
} from "@/lib/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export const authUserChangedEvent = "kostmeal.auth.changed";

export function useAuthUser() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;

      if (data.user) {
        const nextUser = createAuthUserFromSupabaseUser(data.user);
        saveAuthUser(nextUser);
        setAuthUser(nextUser);
      } else {
        clearAuthUser();
        setAuthUser(null);
      }

      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const nextUser = createAuthUserFromSupabaseUser(session.user);
        saveAuthUser(nextUser);
        setAuthUser(nextUser);
      } else {
        clearAuthUser();
        setAuthUser(null);
      }
      setIsLoading(false);
      window.dispatchEvent(new Event(authUserChangedEvent));
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  function setUser(input: AuthUser | { email: string; fullName?: string }) {
    const nextUser = "displayName" in input ? input : createAuthUser(input);

    saveAuthUser(nextUser);
    setAuthUser(nextUser);
    window.dispatchEvent(new Event(authUserChangedEvent));
  }

  async function logout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    clearAuthUser();
    setAuthUser(null);
    router.push("/login");
  }

  return { authUser, isLoading, setUser, logout };
}
