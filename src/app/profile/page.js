"use client";

import CustomButton from "@components/CustomButton";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>Profil</h1>
      <CustomButton
        variant="bg_white_green_outline" 
        size="lg" 
        className=""   
        href="/settings" 
      >
        {t("settings")}
      </CustomButton>
    </div>
  );
}
