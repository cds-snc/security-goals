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
import { getReleases, fromRouter } from "../util";
import { theme } from "../components/styles";
import Layout from "../components/Layout";
import React from "react";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class ReleasePage extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    this.statusRef.focus();
  }
  render() {
    const { data, err, router = false, test } = this.props;
    if (err) {
      return <Failed />;
    }

    const release = fromRouter(router, "release");
    return (
      <div>
        {" "}
        <pre>Release:{test}</pre>
      </div>
    );
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

ReleasePage.getInitialProps = getReleases;

export default ReleasePage;
