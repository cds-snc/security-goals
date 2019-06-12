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
import { I18N } from "./";
import { runtimeConfig } from "../config";

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

const actionsInner = css`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  @media screen and (min-width: 900px) {
    max-width: 85%;
    justify-content: space-between;
  }
`;

const btnHolder = css`
  display: flex;
`;

const btn = css`
  display: inline-block;
  margin: 0 1em;
  color: #fff;
`;

const ActionBar = ({ pdf = "", back2top = false, click, keyDownTop }) => {
  const performance_index = runtimeConfig.performance_index;
  return (
    <div name="action-bar" css={actions}>
      <div css={actionsInner}>
        <div css={btnHolder}>
          {back2top === false ? (
            <PrintButton link={`${pdf}`} />
          ) : (
            <BackToTopButton click={click} keyDownTop={keyDownTop} />
          )}
          {performance_index && (
            <a href={performance_index} css={btn}>
              <I18N t="performance-index" />
            </a>
          )}
        </div>

        <LanguageToggleButton />
      </div>
    </div>
  );
};

export default ActionBar;
