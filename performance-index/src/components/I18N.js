import React, { useContext } from "react";
import LanguageContext from "../LanguageContext";

export const I18N = ({ t, lang }) => {
  const { currentLanguage, translations } = useContext(LanguageContext);

  let useLang = currentLanguage;

  if (lang) {
    useLang = lang;
  }

  let val = translation(t, translations, useLang);

  return <React.Fragment>{val}</React.Fragment>;
};

// translate without React Hook to work with recharts on home page
export function translate(t) {
  const currentLanguage = LanguageContext._currentValue.currentLanguage;
  const translations = LanguageContext._currentValue.translations;

  let val = val = translation(t, translations, currentLanguage);

  return val;
}

function translation(t, translations, lang) {
  let val = "";
  if (t && translations[t] && translations[t][lang]) {
    val = translations[t][lang];
  }
  return val;
}