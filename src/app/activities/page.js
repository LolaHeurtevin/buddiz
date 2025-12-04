"use client";

import { useEffect, useState } from "react";
import ActivitiesList from "@/components/Activities/ActivitiesList";

export default function Activities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch("/api/activities", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        setData(json.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des activités :", error);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <ActivitiesList data={data} />
    </div>
  );
}
