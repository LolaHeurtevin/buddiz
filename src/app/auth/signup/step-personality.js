"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";
import { useAuth } from '@/lib/useAuth'

export default function StepPersonality({formData,setFormData}){

  const { t } = useTranslation()
  const router = useRouter()
  const { user, loading } = useAuth()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // 🔹 redirection automatique
  useEffect(()=>{
    if(!loading && !user){
      router.push('/auth/login')
    }
  },[user,loading,router])

  const finishSignup = async ()=>{

    if (!user) {
      setError('Vous devez être connecté pour continuer')
      return
    }

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

  if (loading) {
    return <p>{t("Loading...")}</p>
  }

  if (!user) {
    return <p>{t("Redirection to authentication...")}</p>
  }

  return(
    <div>

      <h2>{t("Personality test")}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={()=>setFormData({
          ...formData,
          personality:[...formData.personality,'sport']
        })}
      >
        Le sport
      </button>

      <button
        onClick={()=>setFormData({
          ...formData,
          personality:[...formData.personality,'culture']
        })}
      >
        La culture
      </button>

      <button 
        onClick={finishSignup}
        disabled={submitting}
      >
        {submitting ? 'En cours...' : 'Terminer'}
      </button>

    </div>
  )
}