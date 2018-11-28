import { hydrate } from "react-emotion";
import { PageHead, Header, Details } from "../components";
import { getControlStatus } from "../util";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const DetailsPage = ({ err, data }) => {
  return (
    <div>
      <PageHead />
      <Header />
      <Details data={data} err={err} />
    </div>
  );
};

DetailsPage.getInitialProps = getControlStatus;

export default DetailsPage;
