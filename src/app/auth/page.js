'use client'

import CustomButton from '@components/CustomButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next";

export default function AuthPage() {
  const { t } = useTranslation();

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <Image
        src="/buddy/smile.svg"
        alt="Buddy Smiling"
        width={200}
        height={200}
        className="mx-auto mb-8"
      />
      <Image
        src="/buddiz_white.svg"
        alt="Buddiz logo"
        width={200}
        height={200}
        className="mx-auto mb-8"
      />


      <h1>{t("Your new circle beggins here !")}</h1>

      <CustomButton
        variant="sign_in" 
        size="full"   
        href="/auth/signup" 
      >
        {t("I'm signing up")}
      </CustomButton>

      <CustomButton
        variant="bg_white_green_outline" 
        size="full"   
        href="/auth/login" 
      >
        {t("I'm logging in")}
      </CustomButton>

    </div>
  )
}