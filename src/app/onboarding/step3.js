import { useTranslation } from "react-i18next";

export default function Step2({next}){
  const { t } = useTranslation();
  return(
    <div>
      <div className="bg-red-500 rounded-t-lg p-4 mx-[-34px]">
        <h3 className="text-white">{t("Break the ice before taking the plunge")}</h3>

        <p className="text-white">{t("Answer mini-quizzes with other participants before the activity. No more uneasiness.")}</p>

        <div className="flex flex-row gap-4 mt-4">
          <button 
            onClick={next}
            className="radius-radius-lg bg-grey-0 text-black border-2 border-border-buttons-secondary-default rounded-md py-2 px-4 w-[50%]"
            >
            {t("Skip")}
          </button>

          <button 
            onClick={next}
            className="bg-beige-600 border-2 border-beige-600 text-black hover:bg-beige-700 rounded-md py-2 px-4 w-[50%]"
          >
            {t("Discover the app")}
          </button>
        </div>
        
      </div>
    </div>
  )
}