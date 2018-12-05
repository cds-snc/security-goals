import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { UpArrowCircle } from "./";

const topPage = css`
  display: flex;
  align-items: center;
  color: ${theme.colour.black};
  margin: ${theme.spacing.xl} 0 ${theme.spacing.xl} ${theme.spacing.xxl};
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
    <div className={topPage} onClick={click}>
      <UpArrowCircle />
      <span>Back To Top of Page</span>
    </div>
  );
};
