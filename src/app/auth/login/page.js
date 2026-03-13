'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";
import Link from 'next/link'

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
    <div>

      <h1>{t("Login")}</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder={t("Email")}
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />

      <input
        type="password"
        placeholder={t("Password")}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={loading}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? t("Logging in...") : t("Login")}
      </button>

      <p className="mt-4">
        {t("Don't have an account?")} <Link href="/auth/signup">
          {t("Sign up")}
        </Link>
      </p>

    </div>
  )
}