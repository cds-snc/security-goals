/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Details } from "../components";
import Layout from "../components/Layout";
import { detailStatus } from "../../api/index";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.keyHandlerSingleRelease = this.keyHandlerSingleRelease.bind(this);
    this.keyHandlerUL = this.keyHandlerUL.bind(this);
    this.state = { data: [] };
  }

  componentDidMount = async () => {
    const data = await detailStatus(this.props.match.params.controlId);
    this.setState({ data: data });
  };

  keyHandlerSingleRelease(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("control-link")
    );

    var currentItem = document.activeElement;
    var currentItemIndex = items.indexOf(currentItem);
    var nextItem = currentItemIndex;
    var screenWidth = window.innerWidth;

    if (event.key === "ArrowRight") {
      nextItem++;
      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowLeft") {
      nextItem--;
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowDown") {
      if (screenWidth <= 1050) {
        nextItem++;
      } else {
        nextItem += 2;
      }

      if (nextItem >= items.length) {
        nextItem = 0;
      }
      items[nextItem].focus();
    }

    if (event.key === "ArrowUp") {
      if (screenWidth <= 1050) {
        nextItem--;
      } else {
        nextItem -= 2;
      }
      if (nextItem < 0) {
        nextItem = items.length - 1;
      }
      items[nextItem].focus();
    }
  }

  keyHandlerUL(event) {
    var items = Array.prototype.slice.call(
      document.getElementsByName("control-link")
    );

    window.onkeydown = function(e) {
      return !(e.key === " ");
    };

    if (event.key === " ") {
      items[0].focus();
    }
  }

  sortedData = () => {

    function isUrl(s) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
      return regexp.test(s);
    }

    const { data } = this.state;
    let sortedData = { releases: [] };

    if (data.hasOwnProperty("passing") && data.hasOwnProperty("failing")) {
      data.failing.releases.forEach((r) => (
        sortedData.releases.push(
          Object.assign(
            {}, 
            {controls: r.controls[0].verifications.map((v) => Object.assign({}, {urlCheck: isUrl(v.references)}, v))},
            r
          )
        )
      ));
      data.passing.releases.forEach((r) => (
        sortedData.releases.push(
          Object.assign(
            {}, 
            {controls: r.controls[0].verifications.map((v) => Object.assign({}, {urlCheck: isUrl(v.references)}, v))},
            r
          )
        )      
      ));
    };

    return sortedData
  }


  render() {
    const { data } = this.state;
    return (
      <Layout>
        <Details
          keyDownDetails={this.keyHandlerDetails}
          keyDownUL={this.keyHandlerUL}
          id={this.props.match.params.controlId}
          data={data}
          sortedData={this.sortedData()}
        />
      </Layout>
    );
  }
}
export default DetailsPage;
