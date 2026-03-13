"use client";

import { useEffect, useState } from "react";
import ActivitiesList from "@/components/Activities/ActivitiesList";
import { useTranslation } from "react-i18next";
import ActivityViewSwitcher from "@components/Activities/ActivityViewSwitcher";
import FilterAndCreationButtons from "@components/Activities/FilterAndCreationButtons";

export default function Activities() {
  const { t } = useTranslation();

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
      <FilterAndCreationButtons />
      <h1>{t('Activities near you')}</h1>
      <ActivitiesList data={data} />
      <div className="fixed bottom-24 right-4 z-[9999] md:bottom-28 md:right-8">
              <ActivityViewSwitcher />
            </div>
    </div>
  );
}
