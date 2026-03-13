import { useTranslation } from "react-i18next";

export default function StepInfos({formData,setFormData,next}){
  const { t } = useTranslation();

  return (

    <div>

      <h2>{t("Informations")}</h2>

      <input
        placeholder={t("First Name")}
        onChange={(e)=>setFormData({...formData,first_name:e.target.value})}
      />

      <input
        placeholder={t("Last Name")}
        onChange={(e)=>setFormData({...formData,last_name:e.target.value})}
      />

      <input
        placeholder={t("Date of birth")}
        type="date"
        onChange={(e)=>setFormData({...formData,date_of_birth:e.target.value})}
      />

      <select
        onChange={(e)=>setFormData({...formData,gender:e.target.value})}
      >
        <option value="">{t("select")}</option>
        <option value="m">{t("man")}</option>
        <option value="f">{t("woman")}</option>
        <option value="other">{t("other")}</option>
      </select>

      <select
        onChange={(e)=>setFormData({...formData,pronouns:e.target.value})}
      >
        <option value="">{t("select")}</option>
        <option value="he/him">{t("He/Him")}</option>
        <option value="she/her">{t("She/Her")}</option>
        <option value="they/them">{t("They/Them")}</option>
      </select>

      <button onClick={next}>
        {t("Continue")}
      </button>

    </div>
  )
}