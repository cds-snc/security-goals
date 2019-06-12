import React, { useContext } from "react";
import LanguageContext from "../LanguageContext";

export const I18N = ({ t, lang }) => {
  const { currentLanguage, translations } = useContext(LanguageContext);
  let val = "";
  console.log(currentLanguage);

  let useLang = currentLanguage;

  if (lang) {
    useLang = lang;
  }

  if (t && translations[t] && translations[t][useLang]) {
    val = translations[t][useLang];
  }

  return <React.Fragment>{val}</React.Fragment>;
};
