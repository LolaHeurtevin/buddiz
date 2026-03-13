"use client";

import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("Notifications")}</h1>
      <p>{t("You don't have any new notifications")}</p>
    </div>
  );
}