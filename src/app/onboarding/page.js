'use client'

import { useState } from 'react'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { useTranslation } from "react-i18next";

export default function Onboarding(){
  const { t } = useTranslation();
  const router = useRouter()

  const [step,setStep] = useState(1)
  const { user, loading } = useAuth()

  const next = ()=>setStep(step+1)
  const skip = ()=> router.push('/')

  if (loading) {
    return <p>{t("Loading...")}</p>
  }

  if (!user) {
    return <p>{t("Redirection to authentication...")}</p>
  }

  if(step===1) return <Step1 next={next} skip={skip}/>
  if(step===2) return <Step2 next={next} skip={skip}/>
  if(step===3) return <Step3 skip={skip}/>

}