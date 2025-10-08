"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">{t("appName")}</h1>
      <ul className="flex gap-4">
        <li><Link href="/">{t("home")}</Link></li>
        <li><Link href="/profil">{t("profile")}</Link></li>
        <li><Link href="/test">{t("personalityTest")}</Link></li>
      </ul>
    </nav>
  );
}

