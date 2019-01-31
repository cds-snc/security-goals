import { hydrate, css } from "react-emotion";
import { PageHead, Header, Home, ActionBar } from "../components";
import { theme, actionsBottom, mediaQuery } from "../components/styles";
import Layout from "../components/Layout";
import ReleaseBox from "../components/ReleaseBox";
import { releaseStatus } from "../api";
import { format, parse } from "date-fns";
import { getReleases, formatTimestamp } from "../util";

const testPage = css`
  li.selected {
    background: yellow;
  }
  a:hover {
    color: blue;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul {
    list-style-type: none;
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
    console.log(items);

    var currentItem = document.activeElement;

    if (event.key == "ArrowUp") {
      console.log(items.indexOf(currentItem));
      console.log(currentItem);
    }

    if (event.key == "ArrowDown") {
      console.log(document.activeElement.className);
    }

    {
      /* var currentElement = document.activeElement;
    var listItems = document.getElementsByClassName("item");
    if (event.key == "ArrowUp") {
      console.log(listItems.indexOf(currentElement));
    }

    if (event.key == "ArrowDown") {
      console.log(document.activeElement.className);
    }
    */
    }
  }
  render() {
    return (
      <React.Fragment>
        <input type="text" />
        <ul tabIndex="0">
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
