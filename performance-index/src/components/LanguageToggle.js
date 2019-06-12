import React, { useContext } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import LanguageContext from "../LanguageContext";
import { I18N } from "./I18N";
import { theme } from "./styles";

const btn = css`
  color: #fff;
  span {
    font-size: ${theme.font.md};
  }

  display: inline-block;
  align-items: center;
`;

const LanguageToggleButton = () => {
  const { otherLanguage, onLanguageToggle } = useContext(LanguageContext);
  return (
    <a
      onClick={onLanguageToggle}
      data-testid="toggle-link"
      name="toggle-button"
      css={btn}
      href={`#`}
    >
      <span data-testid="lang-toggle">
        <I18N lang={otherLanguage} t="current-language" />
      </span>
    </a>
  );
};

export default LanguageToggleButton;