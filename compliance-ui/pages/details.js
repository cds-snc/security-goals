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
  constructor(props) {
    super(props);
    this.keyHandler = this.keyHandler.bind(this);
    getControlStatus();
  }

  keyHandler() {
    var items = Array.prototype.slice.call(
      document.getElementsByName("control-inner-container")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);
    var nextItem = currentItemIndex;
    var screenWidth = window.innerWidth;

    if (event.key == "ArrowRight" || event.key == "ArrowDown") {
      nextItem++;
      nextItem >= items.length ? (nextItem = 0) : null;
      items[nextItem].focus();
    }

    if (event.key == "ArrowLeft" || event.key == "ArrowUp") {
      nextItem--;
      nextItem < 0 ? (nextItem = items.length - 1) : null;
      items[nextItem].focus();
    }
  }

  render() {
    const { data, err, router = false, controlParam } = this.props;
    if (err) {
      return <Failed />;
    }

    return (
      <Layout styles={{ paddingTop: "0" }} pdf={`pdf-details/${controlParam}`}>
        <Details
          keyDownDetails={this.keyHandler}
          id={controlParam}
          data={data}
          err={err}
        />
      </Layout>
    );
  }
}

DetailsPage.getInitialProps = getControlStatus;

export default DetailsPage;
