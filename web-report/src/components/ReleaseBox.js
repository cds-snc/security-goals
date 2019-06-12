/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "./styles";
import { runtimeConfig } from '../config';
import { I18N } from "./I18N";

const releaseBoxPassing = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};
  margin-bottom: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colour.greenLight};
  }

  time {
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

const releaseTitlePassing = css`
  width: 40rem;

  h2[name="releasebox-title"] {
    font-size: ${theme.font.lg};
    margin: 0 0 0.3rem 0;
    color: ${theme.colour.greenDark};
    word-wrap: break-word;
  }

  ${mediaQuery.md(css`
    width: 100%;
  `)};

  ${mediaQuery.sm(css`
    h2[name="releasebox-title"] {
      font-size: ${theme.font.md};
    }
  `)};
`;

const releaseTitleFailing = css`
  ${releaseTitlePassing}

  h2[name="releasebox-title"] {
    color: ${theme.colour.redDark};
  }
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

const passingFocus = css`
  a:focus {
    outline: 0;

    div[name="release-box"] {
      outline-offset: -4px;
      outline: 4px solid ${theme.colour.greenDark};
    }
  }
`;
const failingFocus = css`
  a:focus {
    outline: 0;

    div[name="release-box"] {
      outline-offset: -4px;
      outline: 4px solid ${theme.colour.redDark};
    }
  }
`;

const ReleaseBox = ({
  release,
  timestamp,
  passed,
  passing,
  total,
  link,
  keyDownAllReleases,
}) => {
  const status = passed === "true" ? "Passed" : "Failed";
  return (
    <li
      name="release-box-list-item"
      data-testid="release-box-list-item"
      aria-label={`${timestamp}`}
      css={passed === "true" ? passingFocus : failingFocus}
    >
      <a
        data-testid="release-box-link"
        tabIndex="-1"
        name="releasebox-link"
        href={link}
        onKeyDown={keyDownAllReleases}
      >
        <div
          data-testid="release-box"
          aria-label={`${status} release: ${runtimeConfig.app_name} #${release.substr(0,4)}, ${passing} out of ${total} checks passing`}
          name="release-box"
          css={passed === "true" ? releaseBoxPassing : releaseBoxFailing}
        >
          <div name="inner-container">
            <div
              css={
                passed === "true" ? releaseTitlePassing : releaseTitleFailing
              }
            >
              <h2 data-testid="release-box-title" name="releasebox-title">
                {passed === "true" ? <I18N t="passed" /> : <I18N t="failed" />}{" "}
                <I18N t="release" lowercase="true" />: {runtimeConfig.app_name} #{release.substr(0,4)}
              </h2>{" "}
              <time
                data-testid="release-box-timestamp"
                name="releasebox-timestamp"
              >
                {timestamp}
                <br/>
                ID: {release}
              </time>
            </div>
            <div name="release-badges" css={releaseBadges}>
              <span
                name="releasebox-passing"
                data-testid="release-box-passing"
                css={passed === "true" ? passingText : failingText}
              >
                {passing} / {total} <I18N t="checks" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default ReleaseBox;
