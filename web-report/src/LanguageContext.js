import React from "react";

const defaultState = {
  currentLanguage: "fr"
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
