"use client"

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function StepInfos({formData,setFormData,next}){

  const { t } = useTranslation();
  const [error, setError] = useState(null)

  const checkFields = ()=>{

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.gender ||
      !formData.pronouns ||
      !formData.date_of_birth
    ) {
      setError(t("Please fill in all fields"))
      return
    }

    // supprimer l'erreur si tout est ok
    setError(null)

    next()
  }

  return (

    <div className="flex flex-col">

      <div className="flex flex-row">
        <Image
          src="/buddy/smile.svg"
          alt="Buddy Smiling"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />

        <div className="flex flex-col">
          <h3>{t("Want to get to know each other ?")}</h3>
          <p className="text-lg">{t("Tell us more about yourself !")}</p>
        </div>
      </div>

      {error && (
        <p className="text-red-500 mt-2">
          {error}
        </p>
      )}


      <div>
        <p className="flex flex-row gap-1 flex-wrap items-center">

          {t("My name is")}

          <input
            placeholder={t("First name")}
            onChange={(e)=>setFormData({...formData,first_name:e.target.value})}
            style={{ width: "25%" }}
          />

          <input
            placeholder={t("Last name")}
            onChange={(e)=>setFormData({...formData,last_name:e.target.value})}
            style={{ width: "25%" }}
          />

          {t(", I was born on")}

          <input
            type="date"
            onChange={(e)=>setFormData({...formData,date_of_birth:e.target.value})}
          />

          {t("and I am a")}

          <select
            onChange={(e)=>setFormData({...formData,gender:e.target.value})}
          >
            <option value="">{t("select")}</option>
            <option value="m">{t("man")}</option>
            <option value="f">{t("woman")}</option>
            <option value="other">{t("other")}</option>
          </select>

          {t(". I use")}

          <select
            onChange={(e)=>setFormData({...formData,pronouns:e.target.value})}
          >
            <option value="">{t("select")}</option>
            <option value="he/him">{t("He/Him")}</option>
            <option value="she/her">{t("She/Her")}</option>
            <option value="they/them">{t("They/Them")}</option>
          </select>

        </p>
      </div>


      <button
        onClick={checkFields}
        className="mt-8 rounded-md bg-green-200 text-black border-2 px-6 py-3 text-lg border-border-buttons-secondary-default"
      >
        {t("Continue")}
      </button>

    </div>
  )
}