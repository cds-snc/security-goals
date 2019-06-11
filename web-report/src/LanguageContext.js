import React from "react";
import translations from "./i18n/translations.json";

const defaultState = {
  currentLanguage: "en",
  translations
};

const LanguageContext = React.createContext(defaultState);

export class LanguageProvider extends React.Component {
  state = defaultState;

  handleLanguageToggle = () => {
    const { currentLanguage } = this.state;
    let lang = currentLanguage === "en" ? "fr" : "en";
    this.setState({ currentLanguage: lang });
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
