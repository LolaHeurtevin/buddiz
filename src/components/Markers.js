"use client";
import "leaflet/dist/leaflet.css";
import { createBlackIcon } from "@/lib/leaflet/customMarkers";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function MarkersInitilizaion({ map }) {
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
          setActivities(data.data);
          setStatus("success");
          console.log("Activités récupérées :", data.data);

          // Créer l'icône noire de manière asynchrone
          const blackIcon = await createBlackIcon();

          // Ajouter les markers
          data.data.forEach((activity) => {
            L.marker([activity.lat, activity.lon], { icon: blackIcon })
                .addTo(map)
                .bindPopup(activity.title);
        });
        } else {
          setStatus("error");
          console.error("Erreur : Réponse API invalide ou activités manquantes", data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des activités :", err);
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
