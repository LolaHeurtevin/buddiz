"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Permet de ne pas avoir de padding blanc sur la page d'accueil
export default function BodyClassController({ className = "app-body", exclude = [] }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const shouldApply = !exclude.includes(pathname);
    if (shouldApply) document.body.classList.add(className);
    else document.body.classList.remove(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [pathname, className, exclude]);

  return null;
}
