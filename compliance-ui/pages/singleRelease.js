import { hydrate, css } from "react-emotion";
import {
  PageHead,
  Header,
  IsReady,
  Grid,
  ActionBar,
  Failed,
  BackToTopButton
} from "../components";
import { theme, mediaQuery } from "../components/styles";
import Layout from "../components/Layout";
import React from "react";
import { controlStatus } from "../api";
import { fromRouter, getSingleRelease } from "../util";
import { BackIcon } from "../components";

const back = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
`;

const home = css`
  a[name="back"] {
    margin-left: ${theme.spacing.xxl};
    margin-top: ${theme.spacing.xl};
  }
  ${mediaQuery.lg(css`
    a[name="back"] {
      margin-left: ${theme.spacing.xl};
    }
  `)};
  ${mediaQuery.sm(css`
    a[name="back"]:first-of-type {
      font-size: ${theme.font.sm};
      margin-top: ${theme.spacing.lg};

      svg {
        height: 0.4rem;
      }
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
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.statusRef.focus();
  }
  render() {
    const { data, err, router = false, releaseParam } = this.props;
    if (err) {
      return <Failed />;
    }
    return (
      <Layout>
        <div data-testid="home" className={home}>
          <a name="back" href="/" className={back}>
            <BackIcon fill={theme.colour.blackLight} />
            Back to main page
          </a>
          <IsReady
            data={data}
            statusRef={statusRef => {
              this.statusRef = statusRef;
            }}
          />

          <Grid releases={data} link={true} />
          <BackToTopButton click={this.clickHandler} />
        </div>
      </Layout>
    );
  }
}

SingleReleasePage.getInitialProps = getSingleRelease;

export default SingleReleasePage;
