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

const errorMessage = css`
  p {
    color: ${theme.colour.white};
    margin-right: ${theme.spacing.lg};
  }
`;

export const Count = ({ status }) => {
  if (status) {
    return (
      <div className={stats} data-testid="total">
        {status.releases.map(release => {
          return (
            <span key="count">
              {release.passing} of {release.total} passing
            </span>
          );
        })}
      </div>
    );
  }

  if (!status) {
    return (
      <div data-testid="error-message" className={errorMessage}>
        <p>Status Counter is missing data.</p>
      </div>
    );
  }
};
