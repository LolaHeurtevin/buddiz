import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function StepInfos({formData,setFormData,next}){
  const { t } = useTranslation();

  return (

    <div className="flex flex-col">
      <div className="flex flex-row">
        <Image
          src="/buddy/smile.svg"
          alt="Buddy Smiling"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <div className="flex flex-col">
          <h3>{t("Want to get to know each other ?")}</h3>
          <p className="text-lg">{t("Tell us more about yourself !")}</p>
        </div>
      </div>

      <div>
        <h3 className="flex flex-row gap-1 flex-wrap">
          {t("My name is")}
          <input
            placeholder={t("First Name")}
            onChange={(e)=>setFormData({...formData,first_name:e.target.value})}
          />

          <input
            placeholder={t("Last Name")}
            onChange={(e)=>setFormData({...formData,last_name:e.target.value})}
          />

          {t(", I was born on")}
          <input
            placeholder={t("Date of birth")}
            type="date"
            onChange={(e)=>setFormData({...formData,date_of_birth:e.target.value})}
          />

          {t("and I am a")}
          <select
            onChange={(e)=>setFormData({...formData,gender:e.target.value})}
          >
            <option value="">{t("select")}</option>
            <option value="m">{t("man")}</option>
            <option value="f">{t("woman")}</option>
            <option value="other">{t("other")}</option>
          </select>

          {t(". I use")}
          <select
            onChange={(e)=>setFormData({...formData,pronouns:e.target.value})}
          >
            <option value="">{t("select")}</option>
            <option value="he/him">{t("He/Him")}</option>
            <option value="she/her">{t("She/Her")}</option>
            <option value="they/them">{t("They/Them")}</option>
          </select>
        </h3>
      </div>

      <button 
        onClick={next}
        className="mt-8 rounded-md bg-green-200 text-black border-2 px-6 py-3 text-lg border-border-buttons-secondary-default"
      >
        {t("Continue")}
      </button>
      
    </div>
  )
}