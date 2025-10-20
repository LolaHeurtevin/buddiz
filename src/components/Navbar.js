"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="app-bottom-nav fixed bottom-0 left-0 right-0 w-full z-[9999] pointer-events-auto bg-main-bordeau text-white"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 2147483647 }}>
      <div className="max-w-4xl mx-auto flex items-center justify-around p-3">
        <Link href="/" className="text-center text-sm">{t("home")}</Link>
        <Link href="/profile" className="text-center text-sm">{t("profile")}</Link>
        <Link href="/test" className="text-center text-sm">{t("personalityTest")}</Link>
      </div>
    </nav>
  );
}

