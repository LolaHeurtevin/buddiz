"use client"

import { use, useEffect, useState } from "react";
import ActivityDetail from "@/components/Activities/ActivityDetail";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import CustomButton from "@components/CustomButton";
import CategoryTag from "@components/CategoryTag";
import Image from "next/image";
import { participate } from "@/lib/participationFunctions";

export default function Activity({ params }) {
  const { t } = useTranslation();
  const { id } = use(params);

  const [activity, setActivity] = useState(null);
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadActivity() {
      try {
        const res = await fetch(`/api/activities/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json();
        setActivity(json.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement de l'activité :", error);
      }
    }

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/user/me", {
          method: "GET",
          credentials: "include",
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Erreur lors de la récupération des informations de l'utilisateur connecté")
        }

        setCurrentUser(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadActivity();
    fetchCurrentUser();
  }, [id]);

  console.log("activity:", activity)
  console.log("currentUser:", currentUser)

  if (loading) return <p>{t("Loading...")}</p>;

  return (
    <div>
      <Image
        src={
          activity?.category === "Outdoor activity"
            ? "/categories/outdoor_activity.jpg"
            : activity?.category === "Sport outing"
            ? "/categories/sport_activity.jpg"
            : activity?.category === "Food outing"
            ? "/categories/food_activity.jpg"
            : activity?.category === "Manual activity"
            ? "/categories/manual_activity.jpg"
            : activity?.category === "Cultural activity"
            ? "/categories/cultural_activity.jpg"
            : "/categories/default.jpg"
        }
        alt={activity.title}
        width={358}
        height={288}
        className="rounded-md mb-4"
      />

      <div className="flex flex-row justify-between mb-6">
        <h1 className="mb-1">{activity.title}</h1>
        {
          currentUser?.user.id === activity?.organizer ? (
            <div className="flex flex-row gap-4">
              <CustomButton
                variant="bg_white_green_outline" 
                size="icon_xsmall"   
                href={`/activities/update/${encodeURIComponent(id)}`}
              >
                <i className="bi bi-pencil-fill" aria-label="Update activity" />
              </CustomButton>

              <CustomButton
                variant="danger" 
                size="icon_xsmall"   
                href={`/activities/delete/${encodeURIComponent(id)}`}
              >
                <i className="bi bi-trash3-fill" aria-label="Delete activity" />
              </CustomButton>
            </div>
          ) : null
        }
      </div>
      <CategoryTag category={activity.category} color="pink-200" />

      <ActivityDetail activity={activity} />

      <button
        onClick={e => participate(e, activity, () => window.location.reload())}
        className={`px-4 py-2 rounded-xl bg-green-200 text-black self-end ml-auto`}
        style={{ display: 'block' }}
      >
        <p>{t("I participate")}</p>
      </button>
    </div>
  );
}
