"use client"

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";
import { useAuth } from '@/lib/useAuth'
import { useState } from 'react';

export default function StepPersonality({formData,setFormData}){
  const { t } = useTranslation();
  const router = useRouter()
  const { user, loading } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const finishSignup = async ()=>{
    // Vérifier que l'utilisateur est authentifié
    if (!user) {
      setError('Vous devez être connecté pour continuer')
      router.push('/auth/login')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          personality: formData.personality
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      router.push('/onboarding')
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err)
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