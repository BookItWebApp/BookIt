import React from 'react';
import { useSelector } from 'react-redux';
const { DateTime } = require('luxon');
import Plot from 'react-plotly.js';

export function TimeChart() {
  const userArticles = useSelector((state) => state.userArticles);
  const sortedArticles = {}; //Sorted list of read articles by date read
  const sortedaddedArticles = {}; //Sorted list of all articles by date added
  const yReadTotal = [];
  const dateList = [];
  const data = [];
  const addedDateList = [];
  let yhelperAdd = [];
  const yTotalArticles = [];

  //Get individual read articles Count
  const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );

  readArticles.map((article) => {
    dateList.push(article.readAt);
  });

  userArticles.map((article) => {
    addedDateList.push(article.createdAt);
  });

  addedDateList.sort();

  dateList.sort();

  //creates sorted article
  dateList.map((date) => {
    sortedArticles[date] = readArticles.filter(
      (article) => article.readAt === date
    );
  });

  addedDateList.map((date) => {
    sortedaddedArticles[date] = userArticles.filter(
      (article) => article.createdAt === date
    );
  });

  const xReadDates = Object.keys(sortedArticles);
  const xAddedDates = Object.keys(sortedaddedArticles);

  for (const [key, value] of Object.entries(sortedaddedArticles)) {
    yhelperAdd.push(value.length);
  }

  for (let i = 0; i < yhelperAdd.length; i++) {
    if (i === 0) {
      yTotalArticles.push(yhelperAdd[i]);
    } else {
      yTotalArticles.push(yTotalArticles[i - 1] + yhelperAdd[i]);
    }
  }

  yhelperAdd = [];
  for (const [key, value] of Object.entries(sortedArticles)) {
    yhelperAdd.push(value.length);
  }

  for (let i = 0; i < yhelperAdd.length; i++) {
    if (i === 0) {
      yReadTotal.push(yhelperAdd[i]);
    } else {
      yReadTotal.push(yTotalArticles[i - 1] + yhelperAdd[i]);
    }
  }

  //add final date value to update graph to present
  xAddedDates.push(DateTime.now().toISO());
  let mostRecentValue = yTotalArticles.at(-1);
  yTotalArticles.push(mostRecentValue);

  //TRACE DATA FOR TIMECHART
  const readArticleTrace = {
    x: [xReadDates[0], ...xReadDates,DateTime.now().toISO()],
    y: [0, ...yReadTotal, yReadTotal.at(-1)],
    name: 'Total Read',
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'blue' },
    fill: 'tozeroy',
    line: { shape: 'spline' },
  };

  const addedArticleTrace = {
    x: xAddedDates,
    y: yTotalArticles,
    name: 'Total Added',
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'red' },
    fill: 'tozeroy',
    line: { shape: 'spline' },
  };

  data.push(readArticleTrace, addedArticleTrace);

  return (
    <div>
      <h3>Total Backlog v. Amount Read</h3>
    <Plot
      data={data}
      layout={{
        width: 550,
        height: 550,
        margin:{b:0},
        barmode: 'stack',
        xaxis: {
          autorange: true,
          tickformat: '%B %Y',
          range: [xAddedDates[0], DateTime.now().toISO()],
          rangeselector: {
            buttons: [
              {
                count: 1,
                label: '1m',
                step: 'month',
                stepmode: 'backward',
              },
              {
                count: 6,
                label: '6m',
                step: 'month',
                stepmode: 'backward',
              },
              { step: 'all' },
            ],
          },
          rangeslider: { range: [xAddedDates[0], DateTime.now().toISO()] },
          type: 'date',
        },
        yaxis: {
          autorange: true,
          type: 'linear',
        },
      }}
    />
    </div>
  );
}
