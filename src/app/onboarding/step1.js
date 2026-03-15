import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Step1({next, skip}){
  const { t } = useTranslation();
  return(

    <div className="flex flex-col justify-between h-screen overflow-hidden">

      <div className="flex items-center justify-center flex-1">
        <Image
          src="/onboarding/onboarding-img-map.svg"
          alt="Buddiz map"
          width={350}
          height={350}
          className="object-contain"
        />
      </div>

      <div className="bg-red-500 rounded-t-lg p-4 mx-[-34px]">
        <h3 className="text-white">
          {t("Your map, your Buddiz, your activities")}
        </h3>

        <p className="text-white">
          {t("Everything happening next to you, in the blink of an eye. Filter them by style, date or ambiance")}
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