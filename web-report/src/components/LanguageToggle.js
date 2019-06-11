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
  const { onLanguageToggle } = useContext(LanguageContext);

  return (
    <a
      onClick={onLanguageToggle}
      data-testid="toggle-link"
      name="toggle-button"
      css={btn}
      href={`#`}
    >
      <span data-testid="print-message">
        <I18N t="current-language" />
      </span>
    </a>
  );
};
