import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { UpArrowCircle } from "./";

const topPage = css`
  display: flex;
  align-items: center;
  color: ${theme.colour.black};
  text-decoration: underline;
  cursor: pointer;

  svg {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 ${theme.spacing.sm} 0 ${theme.spacing.sm};
  }

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.lg} 0 ${theme.spacing.lg} ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    margin: ${theme.spacing.lg} 0 ${theme.spacing.lg} ${theme.spacing.xl};
    span {
      font-size: ${theme.font.sm};
      margin-left: ${theme.spacing.sm};
    }

    svg {
      display: none;
      margin-right: 0;
    }
  `)};
`;

export const BackToTopButton = ({ click }) => {
  return (
    <div
      tabIndex="0"
      className={topPage}
      onClick={click}
      aria-label="click this link to navigate to the top of the page"
    >
      <UpArrowCircle />
      <span>Back To Top of Page</span>
    </div>
  );
};
