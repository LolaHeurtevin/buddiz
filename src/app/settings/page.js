"use client";

export default function Settings() {
  // Ajout du sélecteur de langue
  const { i18n, t } = require('react-i18next').useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <h1>{t('settings')}</h1>
      <div className="mt-4">
        <label htmlFor="language-select" className="mr-2">
          {t("Choose your language")}
        </label>
        <select
          id="language-select"
          value={i18n.language}
          onChange={handleLanguageChange}
          className="border rounded px-2 py-1"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}