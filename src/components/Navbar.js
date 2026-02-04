"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-[9999] pointer-events-auto bg-white border-t border-grey-100"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      
      <div className="flex items-center justify-around p-4">
        <Link href="/" className="flex flex-col items-center justify-center w-12 h-12 hover:opacity-70 transition-opacity" aria-label={t("home")}>
          <i className="bi bi-map-fill text-xl text-red-500"></i>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center justify-center w-12 h-12 hover:opacity-70 transition-opacity" aria-label={t("Activities")}>
          <i className="bi bi-pass-fill text-xl text-red-500"></i>
        </Link>
        <Link href="/shop" className="flex flex-col items-center justify-center w-12 h-12 hover:opacity-70 transition-opacity" aria-label={t("shop")}>
          <i className="bi bi-bag-fill text-xl text-red-500"></i>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center w-12 h-12 hover:opacity-70 transition-opacity" aria-label={t("profile")}>
          <i className="bi bi-person-circle text-xl text-pink-500"></i>
        </Link>
      </div>
    </nav>
  );
}

