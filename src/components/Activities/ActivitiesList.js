"use client";

import { useTranslation } from "react-i18next";
import React from "react";
import ActivityCard from "./ActivityCard";

export default function ActivitiesList({ data = [] }) {
  const { t } = useTranslation();

  if (data.length === 0) {
    return <p>{t("No activities found")}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
