"use client";
import { useTranslation } from "react-i18next";

export default function ActivitiesList({ data = [] }) {
  const { t } = useTranslation();

  //console.log("ActivitiesList data:", data);

  if (data.length === 0) {
    return <p>{t("No activities found")}</p>;
  }

  return (
    <div className="space-y-4 p-4">
      {data.map((activity) => (
        <div
          key={activity.id}
          className="p-4 border rounded bg-tertiary-200 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-1">{activity.title}</h2>
          <p>{t("Max")}: {activity.max_participants} {t("persons")}</p>
          <p>{t("Start date")}: {activity.start_date}</p>
          <p>{t("Duration")}: {activity.estimated_duration} {t("hours")}</p>
        </div>
      ))}
    </div>
  );
}
