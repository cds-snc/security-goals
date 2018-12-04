import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, actionsBottom } from "../components/styles";
import Layout from "../components/Layout";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

const Releases2Page = () => {
  return (
    <Layout>
      <div> Releases Page </div>
      <div className={actionsBottom}>
        <ActionBar />
      </div>
    </Layout>
  );
};

export default Releases2Page;
