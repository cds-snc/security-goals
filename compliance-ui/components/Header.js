import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { Logo } from "./Logo";
import { ActionBar } from "../components";

const bar = css`
  background: ${theme.colour.blackLight};
  color: ${theme.colour.white};

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

const actions = css`
  width: 100%;
  margin-top: ${theme.spacing.xs};
  ${mediaQuery.sm(css`
    div[name="action-bar"] {
      padding-top: 0;
    }

    svg {
      display: none;
    }
  `)};
`;

const Header = ({ pdf = "", id = "" }) => (
  <header data-testid="header" name="header">
    <div className={bar}>
      <h1>Are we compliant yet?</h1>
      <Logo alt="CDS Logo" style={logo} />
      <div className={actions}>
        <ActionBar pdf={pdf} id={id} />
      </div>
    </div>
  </header>
);

export default Header;
