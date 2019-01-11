import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { PrintButton, BackIcon, BackToTopButton } from "./";
import React from "react";

const actions = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.colour.blackLight};
  padding: ${theme.spacing.sm} ${theme.spacing.xxl};

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.xs} ${theme.spacing.xl} ${theme.spacing.xs}
      ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    a,
    a span {
      font-size: ${theme.font.sm};
    }

    img {
      display: none;
    }

    svg {
      height: 0.4rem;
    }

    ${mediaQuery.lg(css`
      padding: ${theme.spacing.xs} ${theme.spacing.xl} ${theme.spacing.md}
        ${theme.spacing.xl};
    `)};
  `)};
`;

const ActionBar = ({ id = "", pdf = "" }) => {
  return (
    <div name="action-bar" className={actions}>
      <PrintButton link={`/${pdf}/${id}`} />
    </div>
  );
};

export default ActionBar;
