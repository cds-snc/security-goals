import { hydrate } from "react-emotion";
import { Details } from "../components";
import { getControlStatus } from "../util";
import Layout from "../components/Layout";
import React from "react";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.keyHandlerDetails = this.keyHandlerDetails.bind(this);
    this.keyHandlerUL = this.keyHandlerUL.bind(this);
  }

  keyHandlerDetails(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("ref-link")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);
    var nextItem = currentItemIndex;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextItem++;
      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextItem--;
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }
  }

  keyHandlerUL(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("ref-link")
    );
    if (event.key === " ") {
      window.onkeydown = function(e) {
        return !(e.key === " ");
      };
      items[0].focus();
    }
  }

  render() {
    const { data, err, controlParam } = this.props;
    if (err) {
      return <Failed />;
    }

    return (
      <Layout styles={{ paddingTop: "0" }} pdf={`pdf-details/${controlParam}`}>
        <Details
          keyDownDetails={this.keyHandlerDetails}
          keyDownUL={this.keyHandlerUL}
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
