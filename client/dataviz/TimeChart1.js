import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';


export class TimeChartOne extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'Lets Look At Articles Read Over Time'} }
      />
    );
  }
}

