"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import React from "react";

export default function ActivityCard({ activity }) {
  const { t } = useTranslation();
  const router = useRouter(); 

  const handleRedirect = (activity) => {
    router.push(`/activities/${encodeURIComponent(JSON.stringify(activity.id))}`);
  };

  return (
    <div
        key={activity.id}
        className="p-4 border rounded bg-tertiary-200 shadow-sm cursor-pointer"
        onClick={() => handleRedirect(activity)}
    >
        <h2 className="text-lg font-semibold mb-1">{activity.title}</h2>
        <p>{t("Max")}: {activity.max_participants} {t("persons")}</p>
        <p>{t("Start date")}: {activity.start_date}</p>
        <p>{t("Duration")}: {activity.estimated_duration} {t("hours")}</p>
    </div>
  );
}
