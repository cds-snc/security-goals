import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, mediaQuery } from "../components/styles";

const layout = css`
  height: 100vh;
  width: 100%;
  background: ${theme.colour.grayLight};
  display: flex;
  flex-direction: column;
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
  padding-top: ${theme.spacing.xl};
  background: ${theme.colour.grayLight};
  svg {
    fill: ${theme.colour.white};
    margin-left: ${theme.spacing.sm};
  }

  span {
    margin: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 0;
    color: ${theme.colour.white};
    text-decoration: underline;
  }

  ${mediaQuery.sm(css`
    svg {
      display: none;
    }

    span {
      margin: ${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.md}
        ${theme.spacing.sm};
    }
  `)}
`;

const content = css`
  flex: 1 0 auto;
  background: ${theme.colour.grayLight};
`;

const footer = css`
  flex-shrink: 0;
`;

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const Layout = ({ children }) => {
  return (
    <div className={layout}>
      <div className={content}>
        <PageHead />
        <Header />
        <div className={actions}>
          <ActionBar />
        </div>
        {children}
      </div>

      <div className={footer}>
        <div className={actionsBottom}>
          <ActionBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
