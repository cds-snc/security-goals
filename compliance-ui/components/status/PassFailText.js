import { css } from "emotion";
import { theme, mediaQuery } from "../styles";

const container = css`
  display: flex;
  justify-content: center;
`;

const isReadyText = css`
  font-size: ${theme.font.xl};
  color: ${theme.colour.white};
  margin: ${theme.spacing.md} ${theme.spacing.lg};
  font-weight: 650;

  ${mediaQuery.xl(css`
    font-size: ${theme.font.xl};
    margin-left: ${theme.spacing.md};
  `)};

  ${mediaQuery.lg(css`
    font-size: 18pt;
    margin-left: ${theme.spacing.lg};
  `)};

  ${mediaQuery.sm(css`
    font-size: ${theme.font.lg};
    margin-left: ${theme.spacing.md};
  `)};
`;

export const PassFailText = ({ status = { passed: 0, total: -1 } }) => {
  const allPassed = status.passed === status.total;
  return (
    <div className={container}>
      <h2 data-testid="status-text" className={isReadyText}>
        {allPassed ? "All the checks have passed" : "Some checks have failed"}
      </h2>
    </div>
  );
};
