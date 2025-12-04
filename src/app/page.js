"use client";

import MapButtons from "../components/MapButtons";
import MarkersInitialization from "@lib/leaflet/markersInitialisation";
import useLeafletMap from "@/lib/leaflet/useLeafletMap";
import { useEffect, useState } from "react";
import ActivityCard from "@/components/Activities/ActivityCard";

export default function Home() {
  const { mapRef, isMapReady } = useLeafletMap();
  const [selectedActivity, setSelectedActivity] = useState(null);

  /* Ne fonctionne pas / Ralenti le chargement de la carte, à corriger
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/activities");
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setActivities(data.data);
          setStatus("success");
          console.log("Activités récupérées :", data.data);
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
  }, []);

  if (status === "error") return <p>Erreur lors du chargement des activités</p>;
  */

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isMapReady && <MarkersInitialization map={mapRef.current} onSelectActivity={(activity) => setSelectedActivity(activity)} />}
      <MapButtons />

      {selectedActivity && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md">
          <ActivityCard activity={selectedActivity} />
        </div>
      )}

    </div>
  );
}

/*"use client";

import MapButtons from "../components/MapButtons";
import MarkersInitialization from "@lib/leaflet/markersInitialisation";
import useLeafletMap from "@/lib/leaflet/useLeafletMap";
import { useEffect, useState } from "react";

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState("loading");
  const { mapRef, isMapReady } = useLeafletMap();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/activities");
        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setActivities(data.data);
          setStatus("success");
          console.log("Activités récupérées :", data.data);
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
  }, []);

  if (status === "error") return <p>Erreur lors du chargement des activités</p>;

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MapButtons />
    </div>
  );
}*/

//<MarkersInitialization map={mapRef.current} activities={activities} />