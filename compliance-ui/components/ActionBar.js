import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { BackToTopButton } from "./BackToTopButton";
import { PrintButton, BackIcon } from ".";
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

class ActionBar extends React.Component {
  clickHandler() {
    console.log("Back to Top");
  }
  render() {
    const { id, backToTop } = this.props;
    return (
      <div css={actions}>
        {id && (
          <a href="/" css={back}>
            <BackIcon />
            Back
          </a>
        )}

        {backToTop && <BackToTopButton click={this.clickHandler} />}

        <PrintButton id={id} backToTop={backToTop} link={`/pdf/${id}`} />
      </div>
    );
  }
}

export default ActionBar;
