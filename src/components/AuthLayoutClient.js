"use client";
import { useAuth } from "@/lib/useAuth";
import { usePathname } from "next/navigation";

export default function AuthLayoutClient({ children }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isAuthPage = pathname.startsWith("/auth");

  if (loading) return null;
  if (!user && !isAuthPage) return null;

  return children;
}
