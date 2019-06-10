/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "./styles";
import {
  PrintButton,
  BackIcon,
  BackToTopButton,
  LanguageToggleButton
} from "./";
import React from "react";

const actions = css`
  display: flex;
  align-items: center;
  background: ${theme.colour.blackLight};
  padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xxl};

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xl};
  `)};

  ${mediaQuery.md(css`
    padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    a,
    a span {
      font-size: ${theme.font.sm};
    }

    padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xl};

    img {
      display: none;
    }

    svg {
      height: 0.4rem;
    }
  `)};
`;

const ActionBar = ({ pdf = "", back2top = false, click, keyDownTop }) => {
  return (
    <div name="action-bar" css={actions}>
      {back2top === false ? (
        <PrintButton link={`${pdf}`} />
      ) : (
        <BackToTopButton click={click} keyDownTop={keyDownTop} />
      )}

      <LanguageToggleButton />
    </div>
  );
};

export default ActionBar;
