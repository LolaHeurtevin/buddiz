"use client"

import { use, useEffect, useState } from "react";
import ActivityDetail from "@/components/Activities/ActivityDetail";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Activity({ params }) {
  const { t } = useTranslation();
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
      <Link href={`/activities/update/${encodeURIComponent(id)}`} key={id}>
      <div
          key={id}
          className="p-4 border rounded-xl bg-tertiary-200 shadow-sm text-main-bordeau"
      >
        {t("Update")}
      </div> 
    </Link>
      <ActivityDetail activity={data} />
    </div>
  );
}
