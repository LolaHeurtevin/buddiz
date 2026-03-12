import { useTranslation } from "react-i18next";

export default function Step1({next}){
  const { t } = useTranslation();
  return(

    <div>

      <h1>{t("Your map, your Buddiz, your activities")}</h1>

      <p>{t("Everything happening next to you, in the blink of an eye. Filter them by style, date or ambiance")}</p>

      <button onClick={next}>
        {t("Skip")}
      </button>

      <button onClick={next}>
        {t("Continue")}
      </button>

    </div>

  )
}