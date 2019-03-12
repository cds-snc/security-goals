import { hydrate } from "react-emotion";
import { Failed } from "../components";
import Layout from "../components/Layout";
import Home from "../components/Home";
import { getReleases } from "../util";
import React from "react";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class ReleasesPage extends React.Component {
  constructor(props) {
    super(props);
    this.keyHandlerAllReleases = this.keyHandlerAllReleases.bind(this);
    this.keyHandlerUL = this.keyHandlerUL.bind(this);
  }

  keyHandlerAllReleases(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("releasebox-link")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);
    var nextItem = currentItemIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      window.onkeydown = function(e) {
        return !(event.key === "ArrowDown");
      };
      nextItem++;
      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      window.onkeydown = function(e) {
        return !(event.key === "ArrowUp");
      };
      nextItem--;
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }
  }

  keyHandlerUL(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("releasebox-link")
    );

    window.onkeydown = function(e) {
      return !(event.key === " ");
    };

    if (event.key === " ") {
      items[0].focus();
    }
  }

  render() {
    const { data } = this.props;
    let sortedData = [];

    /* MAPPING THROUGH THE DATA AND SORTING IT INTO A NEW ARRAY */

    /* FIRST MAPPING THE FAILED DATA */

    if (data) {
      data.releases.map(release => {
        if (release.passed === "false") {
          sortedData.push({
            release: `${release.release}`,
            timestamp: `${release.timestamp}`,
            passed: `${release.passed}`,
            passing: `${release.passing}`,
            total: `${release.total}`
          });
        }
      });

      /* AND THEN MAPPING THE PASSING DATA */

      data.releases.map(release => {
        if (release.passed === "true") {
          sortedData.push({
            release: `${release.release}`,
            timestamp: `${release.timestamp}`,
            passed: `${release.passed}`,
            passing: `${release.passing}`,
            total: `${release.total}`
          });
        }
      });
    }

    if (!data) {
      return <Failed />;
    }
    return (
      <Layout pdf="pdf-releases">
        <Home
          sortedData={sortedData}
          keyDownUL={this.keyHandlerUL}
          keyDownAllReleases={this.keyHandlerAllReleases}
        />
      </Layout>
    );
  }
}

ReleasesPage.getInitialProps = getReleases;

export default ReleasesPage;
