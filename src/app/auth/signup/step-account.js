"use client"

import { supabase } from '@/lib/supabaseClient'
import { useTranslation } from "react-i18next";
import { useState } from 'react';

export default function StepAccount({formData,setFormData,next,back}){
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createAccount = async ()=>{
    setLoading(true)
    setError(null)

    try {
      // Créer l'utilisateur
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options:{
          data:{
            first_name: formData.first_name,
            last_name: formData.last_name,
            gender: formData.gender,
            pronouns: formData.pronouns,
            age: formData.age
          }
        }
      })

      if(authError) throw authError

      // Créer le profil utilisateur
      if (data?.user?.id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            gender: formData.gender,
            pronouns: formData.pronouns,
            date_of_birth: formData.date_of_birth,
            //personality: []
          }])

        if (profileError) throw profileError
      }

      next()
    } catch (err) {
      console.error('Erreur lors de la création du compte:', err)
      
      // Gérer les messages d'erreur spécifiques
      let errorMessage = 'Erreur lors de la création du compte'
      
      if (err.message?.includes('rate limit') || err.message?.includes('rate_limit')) {
        errorMessage = 'Trop de tentatives. Veuillez attendre quelques minutes avant de réessayer avec cet email.'
      } else if (err.message?.includes('already registered')) {
        errorMessage = 'Cet email est déjà enregistré. Essayez la connexion.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return(
    <div>
      <h2>{t("Sign Up")}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        placeholder={t("Email")}
        value={formData.email}
        onChange={(e)=>setFormData({...formData,email:e.target.value})}
      />

      <input
        type="password"
        placeholder={t("Password")}
        value={formData.password}
        onChange={(e)=>setFormData({...formData,password:e.target.value})}
      />

      <button onClick={back} disabled={loading}>
        {t("Back")}
      </button>

      <button onClick={createAccount} disabled={loading}>
        {loading ? "Chargement..." : t("Continue")}
      </button>
    </div>
  )
}