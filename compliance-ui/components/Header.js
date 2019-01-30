import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { Logo } from "./Logo";

const bar = css`
  padding: ${theme.spacing.md} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};
  width: 100%;
  background: ${theme.colour.blackLight};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.md} ${theme.spacing.lg} 0 ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.sm}
      ${theme.spacing.xl};
  `)};
`;

const h1 = css`
  font-size: ${theme.font.xl};
  line-height: 2.8rem;
  font-weight: 650;
  color: ${theme.colour.white};
  margin: 0;

  ${mediaQuery.xl(css`
    font-size: ${theme.font.xl};
  `)};

  ${mediaQuery.lg(css`
    font-size: 18pt;
  `)};

  ${mediaQuery.sm(css`
    font-size: ${theme.font.lg};
    line-height: 1.4rem;
  `)};
`;

const logo = css`
  position: absolute;
  right: ${theme.spacing.xxl};
  top: 1.7rem;
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
    top: 1.7rem;
  `)};

  ${mediaQuery.xs(css`
    display: none;
  `)};
`;

const Header = () => (
  <header name="header" className={bar}>
    <h1 className={h1}>Are we compliant yet?</h1>
    <Logo alt="CDS Logo" style={logo} />
  </header>
);

export default Header;
