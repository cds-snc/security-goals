import { css } from "emotion";
import { theme, passingText, failingText, mediaQuery } from "../styles";
import { Timestamp } from "./Timestamp";

const topInfo = css`
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: ${theme.font.lg};
    font-weight: 700;
    margin-top: 0;
    margin-bottom: ${theme.spacing.md};
    margin-left: ${theme.spacing.lg};
    width: 80%;
  }
  span:first-of-type {
    margin-right: ${theme.spacing.lg};
    font-size: ${theme.font.sm};
    font-weight: 700;
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

const passingTitle = css`
  color: ${theme.colour.greenDark};
`;

const failingTitle = css`
  color: ${theme.colour.redDark};
`;

export const Header = ({
  title,
  status,
  timestamp,
  titleTimestamp,
  titleColour
}) => {
  return (
    <div className={topInfo}>
      <h3
        className={
          status === "true" && titleColour === true
            ? passingTitle
            : status === "false" && titleColour === true
            ? failingTitle
            : null
        }
        name="control-box-title"
        data-testid="control-box-title"
      >
        {titleTimestamp ? `${timestamp}` : title}
      </h3>
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
