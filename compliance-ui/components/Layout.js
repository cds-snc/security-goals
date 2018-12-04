import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, mediaQuery } from "../components/styles";

const layout = css`
  min-height: 100%;
  width: 100%;
  background: ${theme.colour.grayLight};
`;

const actions = css`
  width: 100%;

  span {
    padding-bottom: ${theme.spacing.lg};
  }

  svg {
    margin-bottom: ${theme.spacing.lg};
  }

  ${mediaQuery.lg(css`
    span {
      padding-bottom: ${theme.spacing.lg};
    }

    svg {
      margin-bottom: ${theme.spacing.lg};
    }
  `)};

  ${mediaQuery.sm(css`
    div[name="action-bar"] {
      padding-top: 0;
    }
    span {
      padding-bottom: ${theme.spacing.sm};
      padding-top: ${theme.spacing.sm};
    }

    svg {
      display: none;
    }
  `)};
`;

const actionsBottom = css`
  margin-top: ${theme.spacing.xl};
  svg {
    fill: ${theme.colour.white};
  }

  span {
    margin: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 0;
    color: ${theme.colour.white};
    text-decoration: underline;
  }

  ${mediaQuery.sm(css`
    a[name="print-button"] {
      display: none;
    }
  `)}
`;

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const Layout = ({ click, children, backToTop = "" }) => {
  return (
    <div className={layout}>
      <PageHead />
      <Header />
      <div className={actions}>
        <ActionBar />
      </div>
      {children}

      <div className={actionsBottom}>
        <ActionBar click={click} backToTop={backToTop} />
      </div>
    </div>
  );
};

export default Layout;
