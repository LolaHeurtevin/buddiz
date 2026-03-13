"use client";

import { useTranslation } from "react-i18next";
import React from "react";
import Link from "next/link";

export default function ActivityCard({ activity, status, reload = () => {} }) {
  const { t } = useTranslation();

  async function participate(e) {
    e.stopPropagation(); // Prevent the click event from propagating to the Link
    e.preventDefault(); // Prevent default behavior of the Link
        
    try {
      const res = await fetch('/api/participations', {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ activity_id: activity.id }),
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription à l'activité")
      } else {
        reload()
      }
  
    } catch (err) {
      console.error(err)
    } 
  }

  async function deleteParticipation(e) {
    e.stopPropagation(); // Prevent the click event from propagating to the Link
    e.preventDefault(); // Prevent default behavior of the Link
    console.log("unparticipate");
        
    try {
      const res = await fetch('/api/participations/me', {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ activity_id: activity.id }),
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription à l'activité")
      } else {
        reload()
      }
  
    } catch (err) {
      console.error(err)
    } 
  }

  return (
    <Link href={`/activities/${encodeURIComponent(JSON.stringify(activity.id))}`} key={activity.id}>
      <div
          key={activity.id}
          className="p-4 border rounded-xl bg-tertiary-200 shadow-sm text-main-bordeau"
      >
          <img></img>
          <h2 className="mb-1">{activity.title}</h2>
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
                  onClick={participate}
                  className={`px-4 py-2 rounded-xl bg-cta-200 text-black self-end ml-auto`}
                  style={{ display: 'block' }}
                >
                  <i className="bi bi-plus text-3xl" aria-label="Participate" />
                </button>
              : status === "upcoming"
                ?
                  <button
                    onClick={deleteParticipation}
                    className={`px-4 py-2 rounded-xl bg-cta-200 text-black self-end ml-auto`}
                    style={{ display: 'block' }}
                  >
                    <i className="bi bi-trash3-fill text-3xl" aria-label="Delete participation" />
                  </button>
                : null           
          }
      </div>
    </Link>
  );
}
