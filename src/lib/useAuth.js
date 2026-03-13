"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "./supabaseClient";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Ne pas exécuter sur les pages /auth
    if (pathname.startsWith("/auth")) {
      setLoading(false);
      return;
    }
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
          setUser(null);
          router.replace("/auth");
        } else {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
        router.replace("/auth");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return { user, loading };
}
