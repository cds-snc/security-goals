import { css } from "emotion";
import { theme, mediaQuery } from "../styles";

const stats = css`
  display: flex;
  justify-content: center;
  color: ${theme.colour.white};
  font-size: ${theme.font.md};
  margin-right: ${theme.spacing.lg};

  ${mediaQuery.sm(css`
    display: none;
  `)};
`;

export const Count = ({ status = { passed: 0, total: -1 } }) => {
  return (
    <div className={stats} data-testid="total">
      {status.passed} of {status.total} passing
    </div>
  );
};
