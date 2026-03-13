"use client";

import { useTranslation } from "react-i18next";

export default function Chat() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("My conversations")}</h1>
      <p>{t("You don't have any active conversations right now")}</p>
    </div>
  );
}