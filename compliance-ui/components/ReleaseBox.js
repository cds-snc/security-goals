import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import Link from "next/link";

const releaseBoxPassing = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-left: 1px solid ${theme.colour.grayOutline};
  border-right: 1px solid ${theme.colour.grayOutline};
  border-top: 1px solid ${theme.colour.grayOutline};
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

  div[name="inner-container"] {
    display: flex;
    font-size: ${theme.font.lg};
    color: ${theme.colour.black};
    justify-content: space-between;
    margin-bottom: ${theme.spacing.xs};
  }

  ${mediaQuery.md(css`
    div[name="inner-container"] {
      display: block;
    }
  `)};

  ${mediaQuery.sm(css`
    p {
      font-size: ${theme.font.xs};
    }
  `)};
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
  margin-left: ${theme.spacing.sm};
  padding: ${theme.spacing.xs};
  font-size: ${theme.font.sm};
  border-radius: 5px;

  ${mediaQuery.md(css`
    margin: 0 ${theme.spacing.sm} 0 0;
  `)};

  ${mediaQuery.sm(css`
    font-size: ${theme.font.xs};
    padding: ${theme.spacing.xs};
  `)};
`;

const failingText = css`
${passingText}
  background: ${theme.colour.redDark};

`;

const releaseFocusPassing = css`
  text-decoration: none;

  div:focus {
    outline-offset: -4px;
    outline: 4px solid ${theme.colour.greenDark};
  }
`;

const releaseFocusFailing = css`
  text-decoration: none;

  div:focus {
    outline-offset: -4px;
    outline: 4px solid ${theme.colour.redDark};
  }
`;

const releaseTitle = css`
  width: 40rem;

  h3[name="releasebox-title"] {
    font-size: ${theme.font.lg};
    margin: 0 0 ${theme.spacing.sm} 0;
  }

  ${mediaQuery.md(css`
    width: 100%;
  `)};

  ${mediaQuery.sm(css`
    h3[name="releasebox-title"] {
      font-size: ${theme.font.md};
    }
  `)};
`;
const releaseBadges = css`
  width: 15rem;
  font-weight: 700;
  text-align: right;

  ${mediaQuery.md(css`
    text-align: left;
    width: 100%;
    margin-top: ${theme.spacing.lg};
  `)};

  ${mediaQuery.sm(css`
    margin-top: ${theme.spacing.md};
  `)};
`;

const ReleaseBox = ({ release, timestamp, passed, passing, total, link }) => {
  return (
    <li>
      <Link as={link} href={link}>
        <a
          tabIndex="-1"
          className={
            passed === "true" ? releaseFocusPassing : releaseFocusFailing
          }
        >
          <div
            name="release-box"
            tabIndex="0"
            className={
              passed === "true" ? releaseBoxPassing : releaseBoxFailing
            }
          >
            <div name="inner-container">
              <div className={releaseTitle}>
                <h3 name="releasebox-title">Release: #{release}</h3>{" "}
                <p name="releasebox-timestamp">{timestamp}</p>
              </div>
              <div className={releaseBadges}>
                <span
                  name="releasebox-passing"
                  className={passed === "true" ? passingText : failingText}
                >
                  {passing} / {total} checks
                </span>
                <span
                  name="releasebox-passed"
                  className={passed === "true" ? passingText : failingText}
                >
                  {passed === "true" ? "Passed" : "Failed"}
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default ReleaseBox;
