'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";

export default function AuthPage() {
  const { t } = useTranslation();

  const router = useRouter()

  return (
    <div>

      <h1>{t("Your new circle beggins here !")}</h1>

      <button onClick={() => router.push('/auth/login')}>
        {t("Login")}
      </button>

      <button onClick={() => router.push('/auth/signup')}>
        {t("Sign Up")}
      </button>

    </div>
  )
}