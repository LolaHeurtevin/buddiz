"use client";

import ActivitiesList from "@components/Activities/ActivitiesList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadParticipations() {
    try {
      const res = await fetch("/api/participations/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const json = await res.json();
      const allData = json.participations || [];

      const now = new Date();

      const upcomingEvents = allData.filter(
        (p) => new Date(`${p.activity.start_date}T${p.activity.start_time}`) >= now
      );

      const pastEvents = allData.filter(
        (p) => new Date(`${p.activity.start_date}T${p.activity.start_time}`) < now
      );

      setUpcoming(upcomingEvents);
      setPast(pastEvents);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadParticipations();
  }, []);

  if (loading) return <p>{t("Loading...")}</p>;

  return (
    <div>
      <h1>{t("My activities")}</h1>

      <h2>{t("Upcoming activities")}</h2>
      {upcoming.length === 0 ? (
        <p>{t("No upcoming activities")}</p>
      ) : (
        <ActivitiesList data={upcoming} status="upcoming" reload={loadParticipations} />
      )}

      <h2>{t("Past activities")}</h2>
      {past.length === 0 ? (
        <p>{t("No past activities")}</p>
      ) : (
        <ActivitiesList data={past} status="past" reload={loadParticipations} />
      )}
    </div>
  );
}