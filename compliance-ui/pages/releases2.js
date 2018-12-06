import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, actionsBottom } from "../components/styles";
import Layout from "../components/Layout";
import { releaseStatus } from "../api";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

export const ReleaseBox = ({ release, timestamp, passed }) => {
  return (
    <div>
      <hr />
      <p>{release}</p>
      <p>{timestamp}</p>
      <p>{passed}</p>
      <hr />
    </div>
  );
};

const Releases2Page = ({ data }) => {
  return (
    <Layout>
      {console.log(data.releases[1].release)}
      <div> Releases Page </div>
      {data.releases.map((singleRelease, index) => {
        return <ReleaseBox {...singleRelease} />;
      })}
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
Releases2Page.getInitialProps = getReleases;

export default Releases2Page;
