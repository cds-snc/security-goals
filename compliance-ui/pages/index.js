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
  return (
    <Layout>
      <div className={releases}>
        <h1> Latest Releases: </h1>
        <ul className={releaseList}>
          {data.releases.map((singleRelease, index) => {
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
