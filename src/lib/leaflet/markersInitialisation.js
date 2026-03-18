"use client";
import "leaflet/dist/leaflet.css";
import { createBlackIcon } from "@/lib/leaflet/customMarkers";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function MarkersInitilizaion({ map, onSelectActivity }) {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!map) return;

    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/activities");
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {

          const now = new Date();

          const filteredActivities = data.data.filter((activity) => {

            const start = new Date(`${activity.start_date}T${activity.start_time}`);

            const end = new Date(start);
            end.setHours(end.getHours() + activity.estimated_duration);

            return now <= end; 
          });

          setActivities(filteredActivities);
          setStatus("success");

          console.log("Activités filtrées :", filteredActivities);

          const blackIcon = await createBlackIcon();

          filteredActivities.forEach((activity) => {
            L.marker([activity.lat, activity.lon], { icon: blackIcon })
              .addTo(map)
              .on("click", () => {
                onSelectActivity(activity);
              });
          });

        } else {
          setStatus("error");
          console.error("Erreur API :", data);
        }

      } catch (err) {
        console.error("Erreur fetch :", err);
        setStatus("error");
      }
    };

    fetchActivities();
  }, [map]);

  if (status === "loading") return null;

  if (status === "error") return <p>{t("Error while loading activities")}</p>;

  if (activities.length === 0) {
    return <p>{t("No activities found")}</p>;
  }

  return null;
}