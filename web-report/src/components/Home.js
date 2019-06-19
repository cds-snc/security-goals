/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "../components/styles";
import ReleaseBox from "../components/ReleaseBox";
import { formatTimestamp } from "../util";
import { runtimeConfig } from '../config';
import { I18N } from "./I18N";
import { DateRangePicker } from 'react-dates';
import { minMaxDates } from "../../api/index";
import React from "react";

const releases = css`
  margin: ${theme.spacing.xl} ${theme.spacing.xxl} 0 ${theme.spacing.xxl};

  h1 {
    display: inline-block;
    font-size: ${theme.font.xl};
    color: ${theme.colour.blackLight};
    margin: 0;
  }

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.xl} ${theme.spacing.xl} 0 ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    h1 {
      font-size: ${theme.font.lg};
    }
  `)};
`;

const releaseList = css`
  padding: 0;
  margin-bottom: ${theme.spacing.xxl};

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

const xButton = css`
  margin-left: 1em;
  height: 24px;
  font-weight: bold;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
      minDate: null,
      maxDate: null
    }
  }
  componentDidMount = async () => {
    const dates = await minMaxDates();
    this.setState({
      minDate: dates.releasesMinMax.min,
      maxDate: dates.releasesMinMax.max
    });
    console.log("min: " + dates.releasesMinMax.min);
    console.log("max: " + dates.releasesMinMax.max);
  };
  render () {
    const {keyDownUL, sortedData, keyDownAllReleases} = this.props;
    const clearDates = () => {
      this.setState({startDate: null, endDate: null});
      this.props.onDateSelect(null, null);
    }
    return (
      <div css={releases}>
        <h1 data-testid="index-h1" tabIndex="0">
          <I18N t="releases" />:
        </h1>
        <div name="date-picker">
          <h3>Filter by date:</h3>
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => {
              this.setState({ startDate, endDate });
              this.props.onDateSelect(startDate, endDate);
            }} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            isOutsideRange = {(day) => {
              // clamp between min and max
              let diffTime = day._d.getTime() - this.state.maxDate;
              let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              if (diffDays < 2) { // all dates before maxDate
                diffTime = day._d.getTime() - this.state.minDate;
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if (diffDays > 0) // dates after minDate
                  return false;
              }
              
              return true;
            }}
          />
          <button css={xButton} onClick={clearDates}>X</button>
        </div>
        <ul
          onKeyDown={keyDownUL}
          css={releaseList}
          tabIndex="0"
          data-testid="release-list"
          aria-label={`This is a list of latest releases, press spacebar to enter the group and use your arrow keys to navigate through the list items.`}
        >
          {sortedData.map((singleRelease) => {
            var myDate = Number(singleRelease.releaseTimeStamp);
            var formattedDate = formatTimestamp(myDate);
            const key = `${singleRelease.release}`;
            return (
              <ReleaseBox
                release={singleRelease.release}
                passed={singleRelease.passed}
                timestamp={formattedDate}
                keyDownAllReleases={keyDownAllReleases}
                passing={singleRelease.passing}
                total={singleRelease.total}
                link={`${runtimeConfig.relative_path}/singlerelease/${key}`}
                key={singleRelease.release}
              />
            );
          })}
        </ul>
      </div>
    );
  }
  
};

export default Home;
