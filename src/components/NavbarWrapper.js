"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Masquer Navbar sur les routes /auth et /onboarding
  if (pathname.startsWith("/auth") || pathname.startsWith("/onboarding")) {
    return null;
  }
  
  return <Navbar />;
}
