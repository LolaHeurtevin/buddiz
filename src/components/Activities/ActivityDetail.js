"use client";

import { useTranslation } from "react-i18next";
import React from "react";

export default function ActivityDetail({ activity = [] }) {
  const { t } = useTranslation();
  console.log(activity)

  if (activity.length === 0) {
    return <p>{t("No activity found")}</p>;
  }

  return (
    <div className="">
        <h1 className="text-lg font-semibold mb-1">{activity.title}</h1>
        <p>{t("Max")}: {activity.max_participants} {t("persons")}</p>
        <p>{t("Start date")}: {activity.start_date}</p>
        <p>{t("Duration")}: {activity.estimated_duration} {t("hours")}</p>
        <p>{t("Address")}: {activity.address}, {activity.zip_code} {activity.city}</p>
    </div>
  );
}
