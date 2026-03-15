"use client"

import { useTranslation } from "react-i18next";
import { useState } from 'react';
import Image from "next/image";

export default function StepAccount({formData,setFormData,next,back}){
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createAccount = async ()=>{
    setLoading(true)
    setError(null)

    if (!formData.email || !formData.password) {
      setError(t("Please fill in all fields"))
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          gender: formData.gender,
          pronouns: formData.pronouns,
          date_of_birth: formData.date_of_birth
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du compte')
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
      <div className="flex flex-row gap-4">
        <Image
          src="/buddy/smile.svg"
          alt="Buddy Smiling"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <div className="flex flex-col">
          <h3>{t("Want to create an account ?")}</h3>
          <p>{t("We only use your information to create your account, help you if you run into any issues, and send you exclusive offers (only if you want us to). We promise, no spam or weird sharing.")}</p>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        <input
          placeholder={t("Email address*")}
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          className="custom-input"
        />
        <p>{t("Example : name.surname@domaine.com")}</p>

        <input
          type="password"
          placeholder={t("Password*")}
          value={formData.password}
          onChange={(e)=>setFormData({...formData,password:e.target.value})}
          className="custom-input mt-4"
        />
        <p>{t("Choose a password containing at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number")}</p>
      </div>

      <div className="flex flex-row gap-4 mt-8">
        <button 
          onClick={back} 
          disabled={loading}
          className="rounded-md bg-grey-0 text-black border-2 border-border-buttons-secondary-default px-6 py-3 text-lg"
        >
          {t("Back")}
        </button>

        <button 
          onClick={createAccount} 
          disabled={loading}
          className="rounded-md bg-green-200 text-black border-2 px-6 py-3 text-lg border-border-buttons-secondary-default"
        >
          {loading ? t("Loading...") : t("Continue")}
        </button>
      </div>
    </div>
  )
}