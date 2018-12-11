import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, actionsBottom } from "../components/styles";
import Layout from "../components/Layout";
import ReleaseBox from "../components/ReleaseBox";
import { releaseStatus } from "../api";
import { format, parse } from "date-fns";

const releases = css`
  margin: ${theme.spacing.xl} ${theme.spacing.xxxl} 0 ${theme.spacing.xxxl};

  h1 {
    font-size: ${theme.font.xl};
    color: ${theme.colour.blackLight};
  }
`;

const releaseList = css`
  margin-bottom: ${theme.spacing.xxl};
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
        <div className={releaseList}>
          {data.releases.map((singleRelease, index) => {
            var myDate = new Date(singleRelease.timestamp * 1000);
            const key = `${singleRelease.release}`;
            return (
              <ReleaseBox
                release={singleRelease.release}
                passed={singleRelease.passed}
                timestamp={myDate}
                passing={singleRelease.passing}
                total={singleRelease.total}
                link={`/singlerelease/${key}`}
                key={singleRelease.release}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const getReleases = async () => {
  const result = await releaseStatus();
  const props = { err: false, data: result };
  if (result instanceof Error) {
    props.err = result.message;
  }
  return props;
};
ReleasesPage.getInitialProps = getReleases;

export default ReleasesPage;
