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

export const Count = ({ status }) => {
  return (
    <div className={stats} data-testid="total">
      {status.releases.map(release => {
        return (
          <span>
            {release.passing} of {release.total} passing
          </span>
        );
      })}
    </div>
  );
};
