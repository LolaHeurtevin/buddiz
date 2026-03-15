import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Step3({skip}){
  const { t } = useTranslation();
  return(
    <div className="flex flex-col">
      <Image
        src="/buddy/smile.svg"
        alt="Buddy Smiling"
        width={100}
        height={100}
        className="mx-auto mb-4"
      />
      <div className="bg-red-500 rounded-t-lg p-4 mx-[-34px]">
        <h3 className="text-white">{t("Break the ice before taking the plunge")}</h3>

        <p className="text-white">{t("Answer mini-quizzes with other participants before the activity. No more uneasiness.")}</p>

        <div className="flex flex-row gap-4 mt-4">
          <button 
            onClick={skip}
            className="bg-beige-600 border-2 border-beige-600 text-black hover:bg-beige-700 rounded-md py-2 px-4 w-[100%]"
          >
            {t("Let me discover the app")}
          </button>
        </div>
        
      </div>
    </div>
  )
}