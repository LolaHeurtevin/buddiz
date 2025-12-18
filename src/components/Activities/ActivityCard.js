"use client";

import { useTranslation } from "react-i18next";
import React from "react";
import Link from "next/link";

export default function ActivityCard({ activity }) {
  const { t } = useTranslation();

  function participate(e) {
    e.stopPropagation(); // Prevent the click event from propagating to the Link
    e.preventDefault(); // Prevent default behavior of the Link
    console.log("participate");
  }

  return (
    <Link href={`/activities/${encodeURIComponent(JSON.stringify(activity.id))}`} key={activity.id}>
      <div
          key={activity.id}
          className="p-4 border rounded-xl bg-tertiary-200 shadow-sm text-main-bordeau"
      >
          <h2 className="mb-1">{activity.title}</h2>
          <p>{t("Max")}: {activity.max_participants} {t("persons")}</p>
          <p>{t("Start date")}: {activity.start_date}</p>
          <p>{t("Duration")}: {activity.estimated_duration} {t("hours")}</p>
          <button
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '2%',
              zIndex: 1000,
            }} 
            onClick={participate}
            className={`px-4 py-2 rounded-xl bg-cta-200 text-black`}>
              <i className="bi bi-plus text-3xl" aria-label="Participate" />
          </button>
      </div>
    </Link>
  );
}
