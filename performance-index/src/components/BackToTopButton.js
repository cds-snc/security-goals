/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "./styles";
import { UpArrowCircle } from "./icons/UpArrowCircle";
import { I18N } from "./I18N";

const topPage = css`
  display: flex;
  align-items: center;
  color: ${theme.colour.black};
  text-decoration: underline;
  cursor: pointer;
  margin-right: 20px;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  ${mediaQuery.sm(css`
    span {
      font-size: ${theme.font.sm};
    }

    svg {
      display: none;
      margin-right: 0;
    }
  `)};
`;

const BackToTopButton = ({ click, keyDownTop }) => {
  return (
    <div
      data-testid="back-to-top"
      tabIndex="0"
      css={topPage}
      onClick={click}
      onKeyDown={keyDownTop}
      aria-label="click or press 'Enter' on this link to navigate to the top of the page"
    >
      <UpArrowCircle />
      <span><I18N t="backToTop" /></span>
    </div>
  );
};

export default BackToTopButton;
