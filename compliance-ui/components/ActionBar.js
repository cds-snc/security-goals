import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { PrintButton, BackIcon, BackToTopButton } from "./";
import React from "react";

const actions = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  `)};
`;

const back = css`
  display: inline-block;
  color: #000;
  font-size: ${theme.font.md};
`;

const ActionBar = ({ id = "", backToTop, click }) => {
  return (
    <div className={actions}>
      {id && (
        <a href="/" className={back}>
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
