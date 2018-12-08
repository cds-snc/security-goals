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
import { theme } from "../components/styles";
import Layout from "../components/Layout";
import React from "react";
import { releaseStatus } from "../api";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.statusRef.focus();
  }
  render() {
    const { data, err } = this.props;
    if (err) {
      return <Failed />;
    }
    return (
      <Layout>
        <div data-testid="home">
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

export const getReleases = async () => {
  const result = await releaseStatus();
  const props = { err: false, data: result };
  if (result instanceof Error) {
    props.err = result.message;
  }
  return props;
};

IndexPage.getInitialProps = getReleases;

export default IndexPage;
