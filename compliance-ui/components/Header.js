import { css } from "emotion";
import { theme, mediaQuery } from "./styles";

const bar = css`
  left: 0;
  top: 0;
  width: 100%;
  padding: 0;
  background: ${theme.colour.blackLight};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const h1 = css`
  font-size: ${theme.font.xl};
  line-height: 2.8rem;
  margin: ${theme.spacing.md} ${theme.spacing.xxxl};
  font-weight: 650;
  color: ${theme.colour.white};

  ${mediaQuery.xl(css`
    font-size: ${theme.font.xl};
    margin: ${theme.spacing.md} ${theme.spacing.xxl};
  `)};

  ${mediaQuery.lg(css`
    font-size: 18pt;
    margin: ${theme.spacing.md} ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    font-size: ${theme.font.lg};
    line-height: 1.4rem;
    margin: ${theme.spacing.md} ${theme.spacing.lg};
  `)};
`;

const logo = css`
  width: 2.7rem;
  height: 2.7rem;
  margin-right: ${theme.spacing.xxxl};

  ${mediaQuery.xl(css`
    width: 2.7rem;
    height: 2.7rem;
    margin-right: ${theme.spacing.xxl};
  `)};

  ${mediaQuery.lg(css`
    width: 2.7rem;
    height: 2.7rem;
    margin-right: ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    width: 2rem;
    height: 2rem;
    margin-right: ${theme.spacing.lg};
  `)};
`;

const Header = () => (
  <header className={bar}>
    <h1 className={h1}>Are we compliant yet?</h1>
    <img alt="CDS Logo" src="/static/cdsLogo.svg" className={logo} />
  </header>
);

export default Header;
