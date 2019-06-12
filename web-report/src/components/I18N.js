import React, { useContext } from "react";
import LanguageContext from "../LanguageContext";

export const I18N = ({ t, lang, lowercase }) => {
  const { currentLanguage, translations } = useContext(LanguageContext);
  let val = "";

  let useLang = currentLanguage;

  if (lang) {
    useLang = lang;
  }

  if (t && translations[t] && translations[t][useLang]) {
    val = translations[t][useLang];
  }

  if (lowercase) {
    val = val.toLowerCase();
  }

  return <React.Fragment>{val}</React.Fragment>;
};
