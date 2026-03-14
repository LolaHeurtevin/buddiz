"use client";

import { useTranslation } from "react-i18next";
import React from "react";
import Image from "next/image";

export default function ActivityDetail({ activity = [] }) {
  const { t } = useTranslation();
  console.log(activity)

  if (activity.length === 0) {
    return <p>{t("No activity found")}</p>;
  }

  return (
    <div className="mt-4">
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <div className="justify-center items-center text-center">
            <i className="bi bi-pin-map-fill text-main-pink" aria-label={t("Address")} />
            <p>{activity.address}<br/>{activity.zip_code} {activity.city}</p>
          </div>

          <div className="justify-center items-center text-center">
            <i className="bi bi-people-fill text-main-pink" aria-label={t("Max")}/>
            <p>{activity.max_participants} {t("persons")}</p>
          </div>

          <div className="justify-center items-center text-center">
            <i className="bi bi-calendar-fill text-main-pink" aria-label={t("Start date")} />
            <p>{activity.start_date}</p>
          </div>

          <div className="justify-center items-center text-center">
            <i className="bi bi-clock-fill text-main-pink" aria-label={t("Start time")} />
            <p>{activity.start_time}</p>
          </div>

          <div className="justify-center items-center text-center">
            <i className="bi bi-clock-history text-main-pink" aria-label={t("Duration")} />
            <p>{activity.estimated_duration} {t("hours")}</p>
          </div>

          {
            activity.girl_power ? (
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/icons/girl_power.svg"
                  alt={t("Girl power")}
                  width={16}
                  height={16}
                />

                <p>{t("Girl power")}</p>
              </div>
            ): null
          }
         
          {
            activity.queer_power ? (
              <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/queer_power.svg"
                alt={t("Queer power")}
                width={16}
                height={16}
              />

              <p>{t("Queer power")}</p>
            </div>
            ): null
          }
        </div>

        <p>{activity.description}</p>

        <h3>{t("Participants")}</h3>
    </div>
  );
}
