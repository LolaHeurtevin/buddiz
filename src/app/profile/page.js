"use client";

import CustomButton from "@components/CustomButton";
import { calculateAge } from "@lib/calculateAge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", {
          method: "GET",
          credentials: "include",
        })

        const data = await res.json()

        console.log(data)

        if (!res.ok) {
          throw new Error(data.error || "Erreur lors de la récupération du profil")
        }

        setUserData(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const age = userData?.profile?.date_of_birth ? calculateAge(userData.profile.date_of_birth) : null;

  if (loading) return <div>{t("Loading...")}</div>
  if (error) return <div>{t("Error")} {error}</div>

  return (
    <div>
      <Image src="/buddy/buddy_avatar_plain.png" alt="Profile Image" width={600} height={600} className="rounded-lg" />
      <span className="flex flex-row items-center gap-4">
        <h1>{userData.profile.first_name || "Utilisateur"}</h1> 
        {age !== null && <p>{age} {t("years")}</p>}
      </span>

      <CustomButton
        variant="bg_white_green_outline" 
        size="lg" 
        className=""   
        href="/settings" 
      >
        {t("My settings")}
      </CustomButton>
    </div>
  );
}
