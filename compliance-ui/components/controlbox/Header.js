import { css } from "emotion";
import { theme, passingText, failingText, mediaQuery } from "../styles";

const topInfo = css`
  display: flex;
  justify-content: space-between;
  span:first-of-type {
    font-size: ${theme.font.lg};
    color: ${theme.colour.blackLight};
    font-weight: 700;
    margin-bottom: ${theme.spacing.md};
    width: 80%;
  }
  span:nth-of-type(2) {
    font-size: ${theme.font.sm};
    height: 1.4rem;
    width: 4rem;
  }

  ${mediaQuery.sm(css`
    display: block;
    margin-bottom: ${theme.spacing.sm};

    span:first-of-type {
      width: 100%;
      font-size: ${theme.font.md};
    }

    span:nth-of-type(2) {
      position: relative;
      bottom: 0.1rem;
      font-size: ${theme.font.xs};
      font-weight: 700;
      margin-left: ${theme.spacing.sm};
      padding: 0.18rem 0.45rem;
    }
  `)};
`;

export const Header = ({ title, status }) => {
  if (!status) {
    return <div>HEY</div>;
  }
  return (
    <div className={topInfo}>
      <span data-testid="control-box-title">{title}</span>
      {status === "true" ? (
        <span data-testid="control-box-pass" className={passingText}>
          Passed
        </span>
      ) : (
        <span data-testid="control-box-fail" className={failingText}>
          Failed
        </span>
      )}
    </div>
  );
};
