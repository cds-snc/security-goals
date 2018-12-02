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

const back = css`
  display: inline-block;
  color: ${theme.colour.white};
  font-size: ${theme.font.md};
`;

const ActionBar = ({ id = "", backToTop, click }) => {
  return (
    <div name="action-bar" className={actions}>
      {id && (
        <a name="back" href="/" className={back}>
          <BackIcon />
          Back
        </a>
      )}

      {backToTop && <BackToTopButton click={click} />}

      <PrintButton id={id} backToTop={backToTop} link={`/pdf/${id}`} />
    </div>
  );
};

export default ActionBar;
