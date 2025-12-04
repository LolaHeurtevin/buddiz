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
          setActivities(data.data);
          setStatus("success");
          console.log("Activités récupérées :", data.data);

          const blackIcon = await createBlackIcon();

          data.data.forEach((activity) => {
            L.marker([activity.lat, activity.lon], { icon: blackIcon })
                .addTo(map)
                .on("click", () => {
                  onSelectActivity(activity);
                });
                //.bindPopup(activity.title);
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

/*"use client";

import "leaflet/dist/leaflet.css";
import { createBlackIcon } from "@/lib/leaflet/customMarkers";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function MarkersInitialization({ map }) {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState("loading");
  const router = useRouter();

  useEffect(() => {
    if (!map) return;

    const loadLeafletAndActivities = async () => {
      const L = (await import("leaflet")).default;

      try {
        const res = await fetch("/api/activities");
        const data = await res.json();

        if (!data.success || !Array.isArray(data.data)) {
          setStatus("error");
          return;
        }

        setActivities(data.data);
        setStatus("success");

        const blackIcon = await createBlackIcon();

        data.data.forEach((activity) => {
          const marker = L.marker([activity.lat, activity.lon], { icon: blackIcon })
            .addTo(map)
            .bindPopup(activity.title);

          // 🔥 REDIRECTION SUR OUVERTURE DE POPUP
          marker.on("popupopen", () => {
            router.push(`/activities/${activity.id}`);
          });
        });
      } catch (err) {
        console.error("Erreur API :", err);
        setStatus("error");
      }
    };

    loadLeafletAndActivities();
  }, [map, router]);

  if (status === "loading") return null;
  if (status === "error") return <p>{t("Error while loading activities")}</p>;
  if (activities.length === 0) return <p>{t("No activities found")}</p>;

  return null;
}
*/
