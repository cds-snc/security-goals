import { css } from "emotion";
import { theme, mediaQuery } from "./styles";

const releaseBox = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};

  p {
    margin: 0;
    font-size: ${theme.font.sm};
    color: ${theme.colour.blackLight};
    font-weight: 700;
  }

  div:first-of-type {
    display: flex;
    font-size: ${theme.font.lg};
    color: ${theme.colour.blackLight};
    justify-content: space-between;
    margin-bottom: ${theme.spacing.xs};
  }

  div:first-of-type div:first-of-type span:first-of-type {
    font-weight: 700;
  }

  div:first-of-type div:last-of-type span {
    font-weight: 700;
  }
`;

const passingText = css`
  color: ${theme.colour.white};
  background: ${theme.colour.greenDark};
  padding: ${theme.spacing.xs};
  font-size: ${theme.font.sm};
  border-radius: 5px;
`;

const failingText = css`
  color: ${theme.colour.redwhite};
`;

const releaseLink = css`
  text-decoration: none;
`;

const ReleaseBox = ({ release, timestamp, passed, passing, total }) => {
  return (
    <a href="#" className={releaseLink}>
      <div className={releaseBox}>
        <div>
          <div>
            <span>Release #{release}</span>
          </div>
          <div>
            <span className={passed ? passingText : failingText}>
              {passed ? "Passed" : "Failed"}
            </span>
          </div>
        </div>
        <p>{timestamp.toGMTString()}</p>
      </div>
    </a>
  );
};

export default ReleaseBox;
