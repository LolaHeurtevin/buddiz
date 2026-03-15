import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Step2({next, skip}){
  const { t } = useTranslation();
  return(
    <div className="flex flex-col justify-between min-h-[100dvh] overflow-hidden">

    <div className="flex items-center justify-center flex-1">
      <Image
        src="/onboarding/onboarding-img-power.svg"
        alt="Queer power"
        width={350}
        height={350}
        className="object-contain"
      />
    </div>

    <div className="bg-red-500 rounded-t-lg p-4 mx-[-34px]">

      <h3 className="text-white">
        {t("A safe space to be yourself")}
      </h3>

      <p className="text-white">
        {t("Activities reserved for woman and queer people to help you feel free and at ease")}
      </p>

      <div className="flex flex-row gap-4 mt-4">

        <button 
          onClick={skip}
          className="bg-grey-0 text-black border-2 border-border-buttons-secondary-default rounded-md py-2 px-4 w-[50%]"
        >
          {t("Skip")}
        </button>

        <button 
          onClick={next}
          className="bg-beige-600 border-2 border-beige-600 text-black hover:bg-beige-700 rounded-md py-2 px-4 w-[50%]"
        >
          {t("Continue")}
        </button>

      </div>

    </div>

  </div>
  )
}