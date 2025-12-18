"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="app-bottom-nav fixed bottom-0 left-0 right-0 w-full z-[9999] pointer-events-auto bg-white text-main-bordeau"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 2147483647 }}>
      <div className="max-w-4xl mx-auto flex items-center justify-around p-3">
        <Link href="/" className="text-center text-sm">
          <i className="bi bi-map-fill text-3xl" aria-label={t("home")}></i>
        </Link>
        <Link href="/activities" className="text-center text-sm">
          <i className="bi bi-pass-fill text-3xl" aria-label={t("Activities")}></i>
        </Link>
        <Link href="/shop" className="text-center text-sm">
          <i className="bi bi-bag-fill text-3xl" aria-label={t("shop")}></i>
        </Link>
        <Link href="/profile" className="text-center text-sm">
          <i className="bi bi-person-fill text-3xl" aria-label={t("profile")}></i>
        </Link>
      </div>
    </nav>
  );
}

