/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Header, ActionBar } from "../components";
import { theme, mediaQuery } from "../components/styles";
import React from "react";

const layout = css`
  height: 100vh;
  width: 100%;
  background: ${theme.colour.grayLight};
  display: flex;
  flex-direction: column;
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

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.keyHandler = this.keyHandler.bind(this);
  }
  clickHandler() {
    document.getElementById("back2top").focus();
  }

  keyHandler(event) {
    if (event.key === "Enter") {
      document.getElementById("back2top").focus();
    }
  }
  render() {
    const { children, pdf = "", id = "" } = this.props;
    return (
      <div css={layout}>
        <Header pdf={pdf} id={id} />
        <div data-testid="layout-children" role="main" css={content}>
          {children}
        </div>

        <div data-testid="footer" role="contentinfo" css={footer}>
          <div data-testid="actions-bottom" css={actionsBottom}>
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
