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
    font-size: ${theme.font.xl};
    color: ${theme.colour.blackLight};
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

  li:last-of-type {
    div[name="release-box"] {
      border-bottom: 1px solid ${theme.colour.grayOutline};
    }
  }
`;

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const ReleasesPage = ({ data }) => {
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
        <h1> Latest Releases: </h1>
        <ul className={releaseList}>
          {sortedData.map((singleRelease, index) => {
            var myDate = Number(singleRelease.timestamp);
            var formattedDate = formatTimestamp(myDate);
            const key = `${singleRelease.release}`;
            return (
              <ReleaseBox
                release={singleRelease.release}
                passed={singleRelease.passed}
                timestamp={formattedDate}
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
};

ReleasesPage.getInitialProps = getReleases;

export default ReleasesPage;
