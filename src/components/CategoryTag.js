"use client";

import { useTranslation } from "react-i18next";

const bgColors = {
  "pink-200": "bg-pink-200",
  "red-200": "bg-red-200",
  "green-200": "bg-green-200",
};

export default function CategoryTag({ category, color }) {
  const { t } = useTranslation();

  return (
    <span className={`py-1 px-4 rounded-xl ${bgColors[color]} text-main-bordeau`}>
      {t(category)}
    </span>
  );
}