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
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error || !data?.user) {
          setUser(null);
          // Rediriger vers auth si pas authentifié, sauf si déjà sur /auth
          if (!pathname.startsWith("/auth")) {
            router.push("/auth/login");
          }
        } else {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [pathname, router]);

  return { user, loading };
}
