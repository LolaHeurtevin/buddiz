"use client";

import Button from "@/components/Button";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>Profil</h1>
      <Button onClick={() => alert("Clicked!")}>
        {t("settings")}
      </Button>
    </div>
  );
}
