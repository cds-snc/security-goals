import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import Link from "next/link";

const releaseBoxPassing = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};

  &:hover {
    background: ${theme.colour.greenLight};
  }

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

const releaseBoxFailing = css`
  ${releaseBoxPassing};
  &:hover {
    background: ${theme.colour.redLight};
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
  color: ${theme.colour.white};
  background: ${theme.colour.redDark};
  margin-left: ${theme.spacing.sm};
  padding: ${theme.spacing.xs};
  font-size: ${theme.font.sm};
  border-radius: 5px;
`;

const releaseFocusPassing = css`
  text-decoration: none;

  div:focus {
    outline-offset: -3px;
    outline: 3px solid ${theme.colour.greenDark};
  }
`;

const releaseFocusFailing = css`
  text-decoration: none;

  div:focus {
    outline-offset: -3px;
    outline: 3px solid ${theme.colour.redDark};
  }
`;

const ReleaseBox = ({ release, timestamp, passed, passing, total, link }) => {
  return (
    <Link as={link} tabIndex="-1" href={link}>
      <a
        tabIndex="-1"
        className={
          passed === "true" ? releaseFocusPassing : releaseFocusFailing
        }
      >
        <div
          tabIndex="0"
          className={passed === "true" ? releaseBoxPassing : releaseBoxFailing}
        >
          <div>
            <div>
              <span>Release: #{release}</span>{" "}
            </div>
            <div>
              <span className={passed === "true" ? passingText : failingText}>
                {passing} / {total} checks
              </span>
              <span className={passed === "true" ? passingText : failingText}>
                {passed === "true" ? "Passed" : "Failed"}
              </span>
            </div>
          </div>
          <p>{timestamp.toGMTString()}</p>
        </div>
      </a>
    </Link>
  );
};

export default ReleaseBox;
