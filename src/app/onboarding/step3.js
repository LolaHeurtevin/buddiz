import { useTranslation } from "react-i18next";

export default function Step2({next}){
  const { t } = useTranslation();
  return(

    <div>

      <h1>{t("Break the ice before taking the plunge")}</h1>

      <p>{t("Answer mini-quizzes with other participants before the activity. No more uneasiness.")}</p>

      <button onClick={next}>
        {t("Discover the app")}
      </button>

    </div>

  )
}