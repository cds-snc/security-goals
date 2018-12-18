import { hydrate } from "react-emotion";
import { PageHead, Header, Details } from "../components";
import { getControlStatus, fromRouter } from "../util";
import Layout from "../components/Layout";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class DetailsPage extends React.Component {
  componentDidMount() {
    getControlStatus();
  }
  render() {
    const { data, err, router = false, controlParam } = this.props;
    if (err) {
      return <Failed />;
    }

    return (
      <Layout styles={{ paddingTop: "0" }}>
        <Details id={controlParam} data={data} err={err} />
      </Layout>
    );
  }
}

DetailsPage.getInitialProps = getControlStatus;

export default DetailsPage;
