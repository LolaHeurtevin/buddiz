'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";
import Link from 'next/link'
import Image from 'next/image';

export default function LoginPage() {
  const { t } = useTranslation();

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email et mot de passe requis')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError

      router.push('/')
    } catch (err) {
      console.error('Erreur de connexion:', err)
      
      // Gérer les messages d'erreur spécifiques
      let errorMessage = 'Erreur lors de la connexion'
      
      if (err.message?.includes('rate limit') || err.message?.includes('rate_limit')) {
        errorMessage = 'Trop de tentatives. Veuillez attendre quelques minutes avant de réessayer.'
      } else if (err.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou mot de passe incorrect.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4">
        <Image
          src="/buddy/smile.svg"
          alt="Buddy Smiling"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <div className="flex flex-col">
          <h3>{t("You already have an account ? Log in !")}</h3>
          <p>{t("Your buddiz are waiting for you !")}</p>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder={t("Email address*")}
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
        className="mt-4 custom-input"
      />

      <input
        type="password"
        placeholder={t("Password*")}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
        className="mt-4 custom-input"
      />

      <button 
        onClick={handleLogin} 
        disabled={loading}
        className="rounded-md bg-green-200 text-black border-2 px-6 py-3 text-lg border-border-buttons-secondary-default mt-4"
      >
        {loading ? t("Logging in...") : t("I'm logging in")}
      </button>

      <p className="mt-4">
        {t("Don't have an account ?")} <Link href="/auth/signup">
          {t("Sign up")}
        </Link>
      </p>

    </div>
  )
}