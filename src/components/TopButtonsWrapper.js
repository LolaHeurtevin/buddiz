"use client";

import { usePathname } from "next/navigation";
import TopButtons from "./TopButtons";

export default function TopButtonsWrapper() {
  const pathname = usePathname();
  
  // Masquer TopButtons sur les routes /auth et /onboarding
  if (pathname.startsWith("/auth") || pathname.startsWith("/onboarding")) {
    return null;
  }
  
  return <TopButtons />;
}
