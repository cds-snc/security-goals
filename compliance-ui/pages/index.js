import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home } from "../components";
import { getAllControlsStatus } from "../util";
import { theme } from "../components/styles";

const home = css`
  min-height: 100%;
  width: 100%;
  background: ${theme.colour.grayLight};
`;

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const IndexPage = ({ err, data }) => {
  return (
    <div className={home}>
      <PageHead />
      <Header />
      <Home err={err} data={data} />
    </div>
  );
};

IndexPage.getInitialProps = getAllControlsStatus;

export default IndexPage;
