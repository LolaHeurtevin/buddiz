"use client";

import { useTranslation } from "react-i18next";

export default function PersonalityTests() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("personality test")}</h1>
    </div>
  );
}
