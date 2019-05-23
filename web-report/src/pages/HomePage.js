/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import Layout from "../components/Layout";
import Home from "../components/Home";
import { releaseStatus } from "../../api/index";
import "./Home.css";

const red = css`
  color: #ff0000;
`;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount = async () => {
    const data = await releaseStatus();
    this.setState({ data: data.releases });
  };

  render() {
    const { data } = this.state;
    return (
      <Layout>
        <Home sortedData={data} />
      </Layout>
    );
  }
}

export default HomePage;
