import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, actionsBottom, mediaQuery } from "../components/styles";
import Layout from "../components/Layout";
import ReleaseBox from "../components/ReleaseBox";
import { releaseStatus } from "../api";
import { format, parse } from "date-fns";
import { getReleases, formatTimestamp } from "../util";

const releases = css`
  margin: ${theme.spacing.xl} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};

  h1 {
    display: inline-block;
    font-size: ${theme.font.xl};
    color: ${theme.colour.blackLight};
    margin: 0;
  }

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.xl} ${theme.spacing.xl} 0 ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    h1 {
      font-size: ${theme.font.lg};
    }
  `)};
`;

const releaseList = css`
  padding: 0;
  margin-bottom: ${theme.spacing.xxl};

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

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

  keyHandlerAllReleases() {
    var items = Array.prototype.slice.call(
      document.getElementsByName("releasebox-link")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);
    var nextItem = currentItemIndex;
    var screenWidth = window.innerWidth;

    if (event.key == "ArrowRight" || event.key == "ArrowDown") {
      window.onkeydown = function(e) {
        return !(e.key == "ArrowDown");
      };
      nextItem++;
      nextItem >= items.length ? (nextItem = 0) : null;
      items[nextItem].focus();
    }

    if (event.key == "ArrowLeft" || event.key == "ArrowUp") {
      window.onkeydown = function(e) {
        return !(e.key == "ArrowUp");
      };
      nextItem--;
      nextItem < 0 ? (nextItem = items.length - 1) : null;
      items[nextItem].focus();
    }
  }

  keyHandlerUL() {
    var items = Array.prototype.slice.call(
      document.getElementsByName("releasebox-link")
    );

    window.onkeydown = function(e) {
      return !(e.key == " ");
    };

    if (event.key == " ") {
      items[0].focus();
    }
  }

  render() {
    const { data } = this.props;
    let sortedData = [];

    {
      /* MAPPING THROUGH THE DATA AND SORTING IT INTO A NEW ARRAY */
    }

    {
      /* FIRST MAPPING THE FAILED DATA */
    }

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

    {
      /* AND THEN MAPPING THE PASSING DATA */
    }

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
    return (
      <Layout pdf="pdf-releases">
        <div className={releases}>
          <h1 tabIndex="0"> Latest Releases: </h1>
          <ul
            onKeyDown={this.keyHandlerUL}
            className={releaseList}
            tabIndex="0"
          >
            {sortedData.map((singleRelease, index) => {
              var myDate = Number(singleRelease.timestamp);
              var formattedDate = formatTimestamp(myDate);
              const key = `${singleRelease.release}`;
              return (
                <ReleaseBox
                  release={singleRelease.release}
                  passed={singleRelease.passed}
                  timestamp={formattedDate}
                  keyDownAllReleases={this.keyHandlerAllReleases}
                  passing={singleRelease.passing}
                  total={singleRelease.total}
                  link={`/singlerelease/${key}`}
                  key={singleRelease.release}
                />
              );
            })}
          </ul>
        </div>
      </Layout>
    );
  }
}

ReleasesPage.getInitialProps = getReleases;

export default ReleasesPage;
