import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { UpArrowCircle } from "./";

const topPage = css`
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: underline;
  cursor: pointer;

  svg {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: ${theme.spacing.sm};
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

export const BackToTopButton = ({ click }) => {
  return (
    <div className={topPage} onClick={click}>
      <UpArrowCircle />
      <span>Back To Top of Page</span>
    </div>
  );
};
