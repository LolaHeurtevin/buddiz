"use client";

import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("My activities")}</h1>
    </div>
  );
}