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
  margin-left: 20px;
  align-items: center;
`;

export const LanguageToggleButton = () => {
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
