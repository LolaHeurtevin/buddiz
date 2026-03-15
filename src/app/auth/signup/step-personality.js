"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";
import { useAuth } from '@/lib/useAuth'
import Image from 'next/image';

export default function StepPersonality({formData,setFormData}){

  const { t } = useTranslation()
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  const finishSignup = async ()=>{

    setSubmitting(true)
    setError(null)

    try {
      // sauvegarde personnalité

      router.push('/onboarding')

    } catch (err) {
      console.error(err)
      setError(err.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSubmitting(false)
    }
  }

  return(
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <Image
            src="/buddy/smile.svg"
            alt="Buddy Smiling"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <div className="flex flex-col">
            <h3>{t("Shall we check out your profile together ?")}</h3>
            <p className="text-lg">{t("A few quick questions to get to know you better.")}</p>
          </div>
        </div>


        {error && <p className="text-red-500">{error}</p>}

        <h3>{t("During your free time, you prefer...")}</h3>
        <button
          onClick={()=>{
            setSelected('drinks_restaurent')
            setFormData({...formData, personality:['drinks_restaurent']})
          }}
          className="grey-button"
          style={{
            backgroundColor: selected === 'drinks_restaurent' ? 'var(--grey-500)' : ''
          }}
        >
          {t("Getting drinks / going to the restaurent whith friends")}
        </button>

        <button
          onClick={()=>{
            setSelected('creative')
            setFormData({...formData, personality:['creative']})
          }}
          className="grey-button"
          style={{
            backgroundColor: selected === 'creative' ? 'var(--grey-500)' : ''
          }}
        >
          {t("A creative activity")}
        </button>

        <button
          onClick={()=>{
            setSelected('walk')
            setFormData({...formData, personality:['walk']})
          }}
          className="grey-button"
          style={{
            backgroundColor: selected === 'walk' ? 'var(--grey-500)' : ''
          }}
        >
          {t("A walk outdoor")}
        </button>

        <button
          onClick={()=>{
            setSelected('chill_inside')
            setFormData({...formData, personality:['chill_inside']})
          }}
          className="grey-button"
          style={{
            backgroundColor: selected === 'chill_inside' ? 'var(--grey-500)' : ''
          }}
        >
          {t("A chill activity inside")}
        </button>
      </div>

      <button 
        onClick={finishSignup}
        disabled={submitting}
        className="rounded-md py-2 px-4 bg-green-200 text-black border-2 border-border-buttons-secondary-default mt-4"
      >
        {submitting ? t("Loading...") : t("Continue")}
      </button>

    </div>
  )
}