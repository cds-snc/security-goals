import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, mediaQuery } from "../components/styles";
import React from "react";

const layout = css`
  height: 100vh;
  width: 100%;
  background: ${theme.colour.grayLight};
  display: flex;
  flex-direction: column;
`;

const actions = css`
  width: 100%;

  ${mediaQuery.sm(css`
    div[name="action-bar"] {
      padding-top: 0;
    }

    svg {
      display: none;
    }
  `)};
`;

const actionsBottom = css`
  padding-top: ${theme.spacing.lg};
  background: ${theme.colour.blackLight};
  svg {
    fill: ${theme.colour.white};
    margin-right: ${theme.spacing.sm};
  }

  span {
    color: ${theme.colour.white};
    text-decoration: underline;
  }

  ${mediaQuery.sm(css`
    svg {
      display: none;
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

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }
  clickHandler() {
    document.getElementById("back2top").focus();
  }

  keyHandler() {
    if (event.key == "Enter") {
      document.getElementById("back2top").focus();
    }
  }
  render() {
    const { children, pdf = "", id = "" } = this.props;
    return (
      <div className={layout}>
        <div className={content}>
          <div>
            <PageHead />
            <Header />
            <div className={actions}>
              <ActionBar pdf={pdf} id={id} />
            </div>
          </div>
          <div role="main">{children}</div>
        </div>

        <div role="contentinfo" className={footer}>
          <div className={actionsBottom}>
            <ActionBar
              back2top={true}
              click={this.clickHandler}
              keyDownTop={this.keyHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
