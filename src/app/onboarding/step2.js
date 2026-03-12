import { useTranslation } from "react-i18next";

export default function Step2({next}){
  const { t } = useTranslation();
  return(

    <div>

      <h1>{t("A safe space to be yourself")}</h1>

      <p>{t("Activities reserved for woman and queer people to help you feel free and at ease")}</p>

      <button onClick={next}>
        {t("Skip")}
      </button>

      <button onClick={next}>
        {t("Continue")}
      </button>

    </div>

  )
}