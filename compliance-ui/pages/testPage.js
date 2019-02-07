import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, actionsBottom, mediaQuery } from "../components/styles";
import Layout from "../components/Layout";
import ReleaseBox from "../components/ReleaseBox";
import { releaseStatus } from "../api";
import { format, parse } from "date-fns";
import { getReleases, formatTimestamp } from "../util";

const testPage = css`
  li:focus {
    background: yellow;
  }
`;

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.keyHandler = this.handleKeyPress.bind(this);
  }
  handleKeyPress() {
    var items = Array.prototype.slice.call(
      document.getElementsByClassName("item")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);

    if (event.key == "ArrowDown") {
      currentItemIndex++;

      if (currentItemIndex === items.length) {
        currentItemIndex = 0;
      }

      items[currentItemIndex].focus();

      console.log(currentItemIndex);
    }

    if (event.key == "ArrowUp") {
      currentItemIndex--;

      if (currentItemIndex === -1) {
        currentItemIndex = items.length - 1;
      }

      items[currentItemIndex].focus();

      console.log(currentItemIndex);
    }
  }
  render() {
    return (
      <React.Fragment>
        <ul tabIndex="0" className={testPage}>
          <li tabIndex="0" className="item" onKeyDown={this.handleKeyPress}>
            Item 1
          </li>
          <li tabIndex="0" className="item" onKeyDown={this.handleKeyPress}>
            Item 2
          </li>
          <li tabIndex="0" className="item" onKeyDown={this.handleKeyPress}>
            Item 3
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

TestPage.getInitialProps = getReleases;

export default TestPage;
