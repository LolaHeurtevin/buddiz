"use client"

import { use, useEffect, useState } from "react";
import ActivityDetail from "@/components/Activities/ActivityDetail";

export default function Activity({ params }) {
  const { id } = use(params);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch(`/api/activities/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        setData(json.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement de l'activité :", error);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <ActivityDetail activity={data} />
    </div>
  );
}
