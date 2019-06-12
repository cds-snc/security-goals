import React from "react";
import translations from "./i18n/translations.json";

const savedLang = localStorage.getItem("lang");

let otherLanguage = "fr";

if (savedLang && savedLang === "fr") {
  otherLanguage = "en";
}

const defaultState = {
  currentLanguage: savedLang ? savedLang : "en",
  otherLanguage,
  translations
};

const LanguageContext = React.createContext(defaultState);

export class LanguageProvider extends React.Component {
  state = defaultState;

  handleLanguageToggle = () => {
    const { currentLanguage } = this.state;
    let lang = currentLanguage === "en" ? "fr" : "en";

    let otherLanguage = "fr";

    if (lang === "fr") {
      otherLanguage = "en";
    }

    localStorage.setItem("lang", lang);

    this.setState({ currentLanguage: lang, otherLanguage });
  };

  render() {
    return (
      <LanguageContext.Provider
        value={{
          ...this.state,
          onLanguageToggle: this.handleLanguageToggle
        }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

export default LanguageContext;
