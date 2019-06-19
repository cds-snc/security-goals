/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "./styles";
import { Logo } from "./Logo";
import { I18N } from "./I18N";
import LanguageToggleButton from "./LanguageToggle";
import { runtimeConfig } from "../config";

const bar = css`
  background: ${theme.colour.blackLight};
  color: ${theme.colour.white};
  height: 115px;
  h1 {
    font-size: ${theme.font.xl};
    padding: ${theme.spacing.lg} 0 0 ${theme.spacing.xxl};
    margin:0;

    ${mediaQuery.lg(css`
      font-size: 18pt;
      padding: ${theme.spacing.lg} 0 0 ${theme.spacing.xl};
    `)}

    ${mediaQuery.sm(css`
      font-size: ${theme.font.lg};
      padding: ${theme.spacing.lg} 0 ${theme.spacing.xs} ${theme.spacing.xl};
    `)}

    ${mediaQuery.xs(css`
      padding: ${theme.spacing.lg} 0 ${theme.spacing.md} ${theme.spacing.xl};
    `)}
  }
`;

const langButton = css`
    margin: ${theme.spacing.lg} 0 0 ${theme.spacing.xxl};

    ${mediaQuery.lg(css`
      margin: ${theme.spacing.lg} 0 0 ${theme.spacing.xl};
    `)}

    ${mediaQuery.sm(css`
      font-size: ${theme.font.lg};
      margin: ${theme.spacing.lg} 0 ${theme.spacing.xs} ${theme.spacing.xl};
    `)}

    ${mediaQuery.xs(css`
      margin: ${theme.spacing.lg} 0 ${theme.spacing.md} ${theme.spacing.xl};
    `)}
`;

const logo = css`
  position: absolute;
  right: ${theme.spacing.xxl};
  top: 1.8rem;
  width: 3.75rem;
  height: 3.75rem;

  ${mediaQuery.lg(css`
    right: ${theme.spacing.xl};
    width: 3.4rem;
    height: 3.4rem;
  `)};

  ${mediaQuery.sm(css`
    width: 2.5rem;
    height: 2.5rem;
    top: 2rem;
  `)};

  ${mediaQuery.xs(css`
    display: none;
  `)};
`;

const actionsInner = css`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  @media screen and (min-width: 900px) {
    max-width: 85%;
    justify-content: space-between;
  }
`;

const btnHolder = css`
  display: flex;
`;

const btn = css`
  display: inline-block;
  margin: 0 1em;
  color: #fff;
  margin: 1.5rem 0 0 5rem;
`;

const web_report = runtimeConfig.web_report;

const actions = css`
  display: flex;
`;

const Header = () => (
  <header data-testid="header" name="header">
    <div css={bar}>
      <a id="back2top" href="#" />
      <h1 data-testid="main-header-h1">
        {runtimeConfig.app_name} - <I18N t="tagline" />
      </h1>

      <div css={actions}>
        <div css={actionsInner}>
          <div>
            {web_report && (
              <div css={btnHolder}>
                <a href={web_report} css={btn}>
                  <I18N t="web-report" />
                </a>
              </div>
            )}
          </div>

          <div css={langButton}>
            <LanguageToggleButton />
          </div>
        </div>
      </div>
    </div>

    <Logo alt="CDS Logo" style={logo} />
  </header>
);

export default Header;
