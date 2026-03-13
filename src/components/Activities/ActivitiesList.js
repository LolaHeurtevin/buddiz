"use client";

import { useTranslation } from "react-i18next";
import React from "react";
import ActivityCard from "./ActivityCard";

/*
  status: "upcoming" les activités à venir auxquelles on est inscrit | "past" les activités passées auxquelles on a participé | "all" toutes les activités auxquelles on n'est pas inscrits
*/
export default function ActivitiesList({ data = [], status="all", reload}) {
  const { t } = useTranslation();

  if (data.length === 0) {
    return <p>{t("No activities found")}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {
        status === "all"
          ? data.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} status={status} reload={reload} />
            ))
          : (status === "upcoming" || status === "past")
            ? data.map((participation) => (
                <ActivityCard key={participation.activity.id} activity={participation.activity} status={status} reload={reload}/>
              ))
            : null
      }
    </div>
  );
}
