/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import Layout from "../components/Layout";
import Home from "../components/Home";
import { Failed } from "../components";
import { releaseStatus, dateFilteredControls } from "../../api/index";
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

  onDateSelect = async (startDate, endDate) => {
    // parse startDate and endDate to expected format
    const sD = formatDate(startDate);
    const eD = formatDate(endDate);
    const data = await dateFilteredControls(sD, eD);
    this.setState({ data: data.releases })

    function formatDate(d) {
      if (!d)
        return undefined;

      let month = '' + (d._d.getMonth() + 1),
        day = '' + d._d.getDate(),
        year = d._d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
  };

  render() {
    const { data } = this.state;

    if (!data || data.length < 1) {
      return <Failed />;
    }

    return (
      <Layout>
        <Home sortedData={data} onDateSelect={this.onDateSelect} />
      </Layout>
    );
  }
}

export default HomePage;
