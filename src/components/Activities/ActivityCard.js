"use client";

import { useTranslation } from "react-i18next";
import React from "react";
import Link from "next/link";
import { participate, deleteParticipation } from "@/lib/participationFunctions";
import Image from "next/image";

export default function ActivityCard({ activity, status, reload = () => {} }) {
  const { t } = useTranslation();

  

  return (
    <Link href={`/activities/${encodeURIComponent(JSON.stringify(activity.id))}`} key={activity.id}>
      <div
        key={activity.id}
        className="p-4 rounded-xl bg-beige-200 shadow-sm text-main-bordeau flex flex-row gap-4"
      >
        <Image
          src={
            activity?.category === "Outdoor activity"
              ? "/categories/outdoor_activity.jpg"
              : activity?.category === "Sport outing"
              ? "/categories/sport_activity.jpg"
              : activity?.category === "Food outing"
              ? "/categories/food_activity.jpg"
              : activity?.category === "Manual activity"
              ? "/categories/manual_activity.jpg"
              : activity?.category === "Cultural activity"
              ? "/categories/cultural_activity.jpg"
              : "/categories/default.jpg"
          }
          alt={activity.title}
          width={144}
          height={144}
          className="rounded-md mb-4 object-cover"
        />
        <div className="flex flex-col gap-2">
          <p className="mb-1 text-xl font-bold">{activity.title}</p>
          <div className="flex flex-row flex-wrap gap-4">
            <div className="justiy-center items-center text-center">
              <i className="bi bi-pin-map-fill text-xl text-main-pink" aria-label={t("Address")} />
              <p>{activity.address}<br/>{activity.zip_code} {activity.city}</p>
            </div>

            <div className="justiy-center items-center text-center">
              <i className="bi bi-people-fill text-xl text-main-pink" aria-label={t("Max")}/>
              <p>/{activity.max_participants}</p>
            </div>

            <div className="justiy-center items-center text-center">
              <i className="bi bi-calendar-fill text-xl text-main-pink" aria-label={t("Start date")} />
              <p>{activity.start_date}</p>
            </div>

            <div className="justiy-center items-center text-center">
              <i className="bi bi-clock-fill text-xl text-main-pink" aria-label={t("Start time")} />
              <p>{activity.start_time}</p>
            </div>
          </div>

          {
            status === "all"
              ? 
                <button
                  onClick={e => participate(e, activity, reload)}
                  className={`w-12 h-12 rounded-xl bg-green-200 text-black self-end ml-auto`}
                  style={{ display: 'block' }}
                >
                  <i className="bi bi-plus text-xl" aria-label="Participate" />
                </button>
              : status === "upcoming"
                ?
                  <button
                    onClick={e => deleteParticipation(e, activity, reload)}
                    className={`px-4 py-2 rounded-xl bg-cta-200 text-black self-end ml-auto`}
                    style={{ display: 'block' }}
                  >
                    <i className="bi bi-trash3-fill text-xl" aria-label="Delete participation" />
                  </button>
                : null           
          }
          
        </div>
      </div>
    </Link>
  );
}
