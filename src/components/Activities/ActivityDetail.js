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
        <h1 className="mb-1">{activity.title}</h1>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <div className="justiy-center items-center text-center">
            <i className="bi bi-pin-map-fill text-3xl text-main-pink" aria-label={t("Address")} />
            <p>{activity.address}<br/>{activity.zip_code} {activity.city}</p>
          </div>

          <div className="justiy-center items-center text-center">
            <i className="bi bi-people-fill text-3xl text-main-pink" aria-label={t("Max")}/>
            <p>{activity.max_participants} {t("persons")}</p>
          </div>

          <div className="justiy-center items-center text-center">
            <i className="bi bi-calendar-fill text-3xl text-main-pink" aria-label={t("Start date")} />
            <p>{activity.start_date}</p>
          </div>

          <div className="justiy-center items-center text-center">
            <i className="bi bi-clock-fill text-3xl text-main-pink" aria-label={t("Start time")} />
            <p>{activity.start_time}</p>
          </div>

          <div className="justiy-center items-center text-center">
            <i className="bi bi-clock-history text-3xl text-main-pink" aria-label={t("Duration")} />
            <p>{activity.estimated_duration} {t("hours")}</p>
          </div>
        </div>

        <p>{activity.description}</p>

        <h2>{t("Participants")}</h2>
    </div>
  );
}
