/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Layout from "../components/Layout";

import React from "react";

import "./Home.css";

const red = css`
  color: #ff0000;
`;

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <h2 css={red}>Welcome to Razzles</h2>
      </Layout>
    );
  }
}

export default Home;
