"use client";

import TestForm from "@/components/TestForm";
import { useTranslation } from "react-i18next";

export default function PersonalityTest({ params}) {
  const { t } = useTranslation();

  return (
    <div>
        <TestForm />
    </div>
  );
}
