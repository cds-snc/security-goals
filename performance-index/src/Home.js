import React from 'react';
import { AreaChart, ResponsiveContainer, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { allReleases } from "./api/index";
import { getControls, setInitialWeight } from "./util/controls";
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { releases: [], weightedControls: {} };
  }

  componentDidMount = async () => {
    const data = await allReleases();
    const controls = getControls(data.releases);
    const initialWeight = setInitialWeight(controls);
    this.setState({ releases: data.releases, weightedControls: initialWeight});
  };

  changeHandler = (id, e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      let { weightedControls } = this.state;
      weightedControls[id] = parseInt(e.target.value, 10); 
      this.setState({ weightedControls: weightedControls});
    }
  }

  renderData = () => {
    if (this.state.weightedControls){

      let { weightedControls } = this.state;

      const rows = Object.keys(weightedControls).map((key, index) => (
        <li className="weightItem" key={index}>
          <b>{key}</b>
          <br/>
          <input type="text" value={weightedControls[key]} onChange={(e) => this.changeHandler(key,e)}/>
          <br/>
          <br/>
        </li>
      ));

      return (
        <ul>
          {rows}
        </ul>
      )
    }
  }

  chartData = () => {
    let { releases, weightedControls } = this.state;

    let data = [];

    releases.forEach((release) => {
      const score = release.controls.reduce((acc, control) => {
        acc.expected = acc.expected + weightedControls[control.control]
        if(control.verifications.every((v) => v.passed == "true")) {
          acc.actual = acc.actual + weightedControls[control.control];
          return acc;
        } else {
          return acc;
        }
      }, {actual: 0, expected: 0});
      const date = new Date(parseInt(release.timestamp, 10));
      data.push({name: date.toISOString(), actual: score.actual, expected: score.expected})
    })

    return data.reverse();
  }

  renderRawChart = () => {
    if (this.state.weightedControls){

      const data = this.chartData();
      
      return (
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer>
            <AreaChart data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="4 4" />
              <Area type="monotone" dot={{ fill: '#a70000' }} dataKey="expected" stroke="#ff8080" fill="#ff8080" fillOpacity={1}/>
              <Area type="monotone" dot={{ fill: '#ffcf0a' }} dataKey="actual" stroke="#ffe680" fill="#ffe680" fillOpacity={1}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )
    }        
  }

  renderAbsoluteChart = () => {
    if (this.state.weightedControls){

      let data = this.chartData();
      data = data.map((d) => ({name: d.name, covered: d.actual, remaining: (d.expected - d.actual)}));
      const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
      const getPercent = (value, total) => {
        const ratio = total > 0 ? value / total : 0;
        return toPercent(ratio, 2);
      };
      const renderTooltipContent = (o) => {
        const { payload, label } = o;
        const total = payload.reduce((result, entry) => (result + entry.value), 0);
      
        return (
          <div>
            Chance of event
            <ul className="list">
              {
                payload.map((entry, index) => (
                  <li key={`item-${index}`} style={{ color: "blakc" }}>
                    {`${entry.name}: ${getPercent(entry.value, total)}`}
                 </li>
                ))
              }
            </ul>
          </div>
        );
      };
     
      return (
        <div style={{ width: '100%', height: 500 }}>
          <ResponsiveContainer>
            <AreaChart 
              data={data}
              stackOffset="expand"
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={toPercent} />
              <Tooltip content={renderTooltipContent} />
              <Legend />
              <CartesianGrid strokeDasharray="4 4" />
              <Area type="monotone" dot={{ fill: '#ffcf0a' }} stackId="1" dataKey="covered" stroke="#ffe680" fill="#ffe680" fillOpacity={1}/>

              <Area type="monotone" dot={{ fill: '#a70000' }} stackId="1" dataKey="remaining" stroke="#ff8080" fill="#ff8080" fillOpacity={1}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )
    }        
  }

  render() {
    return (
      <div>
        <h2>Raw Performance Index</h2>
        {this.renderRawChart()}
        <h2>Chance of negative event</h2>
        {this.renderAbsoluteChart()}
        <hr/>
        {this.renderData()}
      </div>
    );
  }
}

export default Home;
