import React, { useContext } from "react";
import LanguageContext from "../LanguageContext";

export const I18N = ({ t }) => {
  const { currentLanguage, translations } = useContext(LanguageContext);
  let val = "";

  if (t && translations[t] && translations[t][currentLanguage]) {
    val = translations[t][currentLanguage];
  }

  return <React.Fragment>{val}</React.Fragment>;
};
