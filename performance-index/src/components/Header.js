/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "./styles";
import { Logo } from "./Logo";
import { runtimeConfig } from '../config';

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

const Header = () => (
  <header data-testid="header" name="header">
    <div css={bar}>
      <a id="back2top" href="#"></a>
      <h1 data-testid="main-header-h1">{runtimeConfig.app_name} - Security Goals: Performance Index</h1>
      <Logo alt="CDS Logo" style={logo} />
    </div>
  </header>
);

export default Header;
