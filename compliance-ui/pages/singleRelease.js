import { hydrate, css } from "react-emotion";
import { IsReady, GridSingleRelease, Failed, BackIcon } from "../components";
import { theme, mediaQuery } from "../components/styles";
import Layout from "../components/Layout";
import React from "react";
import { getSingleRelease } from "../util";

const back = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
`;

const singleReleasePage = css`
  span[name="back-text"] {
    margin-left: ${theme.spacing.xs};
  }
  a[name="back"]:first-of-type {
    margin: ${theme.spacing.xl} 0 0 ${theme.spacing.xxl};
  }

  a[name="back"]:last-of-type {
    margin: ${theme.spacing.lg} 0 3rem ${theme.spacing.xxl};
  }

  ${mediaQuery.lg(css`
    a[name="back"]:first-of-type {
      margin: ${theme.spacing.xl} 0 0 ${theme.spacing.xl};
    }

    a[name="back"]:last-of-type {
      margin: ${theme.spacing.lg} 0 3rem ${theme.spacing.xl};
    }
  `)};
  ${mediaQuery.sm(css`
    a[name="back"]:first-of-type {
      font-size: ${theme.font.sm};
      margin-top: ${theme.spacing.lg};

      svg {
        height: 0;
        display: none;
      }

      span[name="back-text"] {
        margin-left: -0.7rem;
      }
    }

    a[name="back"]:last-of-type {
      font-size: ${theme.font.sm};
      margin-bottom: ${theme.spacing.lg};
    }

    svg {
      height: 0;
      display: none;
    }

    span[name="back-text"] {
      margin-left: -0.7rem;
    }
  `)};
`;

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class SingleReleasePage extends React.Component {
  constructor(props) {
    super(props);
    this.keyHandlerSingleRelease = this.keyHandlerSingleRelease.bind(this);
    this.keyHandlerUL = this.keyHandlerUL.bind(this);
  }

  keyHandlerSingleRelease(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("control-link")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);
    var nextItem = currentItemIndex;
    var screenWidth = window.innerWidth;

    if (event.key === "ArrowRight") {
      nextItem++;
      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowLeft") {
      nextItem--;
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowDown") {
      if (screenWidth <= 1050) {
        nextItem++;
      } else {
        nextItem += 2;
      }

      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowUp") {
      if (screenWidth <= 1050) {
        nextItem--;
      } else {
        nextItem -= 2;
      }
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }
  }

  keyHandlerUL(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("control-link")
    );

    window.onkeydown = function(e) {
      return !(e.key === " ");
    };

    if (event.key === " ") {
      items[0].focus();
    }
  }
  render() {
    const { data, err, releaseParam } = this.props;
    if (err || !data) {
      return <Failed />;
    }

    return (
      <div>
        <Layout pdf={`pdf-singlerelease/${releaseParam}`}>
          <div data-testid="home" className={singleReleasePage}>
            <a data-testid="back-button" name="back" href="/" className={back}>
              <BackIcon fill={theme.colour.blackLight} />
              <span name="back-text">Back to home</span>
            </a>
            <IsReady data={data} />

            <GridSingleRelease
              keyDownSingleRelease={this.keyHandlerSingleRelease}
              keyDownUL={this.keyHandlerUL}
              releases={data}
              link={true}
              keyDown={this.keyHandler}
            />
            <a data-testid="back-button" name="back" href="/" className={back}>
              <BackIcon fill={theme.colour.blackLight} />
              <span name="back-text">Back to home</span>
            </a>
          </div>
        </Layout>
      </div>
    );
  }
}

SingleReleasePage.getInitialProps = getSingleRelease;

export default SingleReleasePage;
