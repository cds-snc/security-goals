import { hydrate } from "react-emotion";
import { PageHead, Header, Details } from "../components";
import { getControlStatus } from "../util";
import Layout from "../components/Layout";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const DetailsPage = ({ err, data, controlParam }) => {
  return (
    <Layout styles={{ paddingTop: "0" }}>
      <Details data={data} err={err} />
    </Layout>
  );
};

DetailsPage.getInitialProps = getControlStatus;

export default DetailsPage;
