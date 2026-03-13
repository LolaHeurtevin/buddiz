'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StepInfos from './step-infos'
import StepAccount from './step-account'
import StepPersonality from './step-personality'
import { useTranslation } from "react-i18next";

export default function SignupPage(){
  const { t } = useTranslation();

  const router = useRouter()
  const [step,setStep] = useState(1)

  const [formData,setFormData] = useState({
    first_name:'',
    last_name:'',
    date_of_birth:'',
    gender:'',
    pronouns:'',
    email:'',
    password:'',
    personality:[]
  })

  const next = ()=>setStep(step+1)
  const back = ()=>setStep(step-1)

  return (

    <div>
      <button onClick={() => router.push('/auth')} className="mb-4">
        ← {t("Back")}
      </button>

      {step === 1 &&
        <StepInfos
          formData={formData}
          setFormData={setFormData}
          next={next}
        />
      }

      {step === 2 &&
        <StepAccount
          formData={formData}
          setFormData={setFormData}
          next={next}
          back={back}
        />
      }

      {step === 3 &&
        <StepPersonality
          formData={formData}
          setFormData={setFormData}
          back={back}
        />
      }

    </div>
  )
}