import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';

export function TimeChartOne() {
  const userArticles = useSelector((state) => state.userArticles);
  const SortedArticles = {};
  const yReadCount = [];
  const dateList = [];
  const data = []

  //Get individual read articles Count
  const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );

  const dateCleanedArticles = readArticles.map((article) => {
    article.readAt = article.readAt.substr(0, article.readAt.indexOf('T'));
    return article;
  });

  dateCleanedArticles.map((article) => {
    dateList.push(article.readAt);
  });
  dateList.sort();

  dateList.map((date) => {
    SortedArticles[date] = dateCleanedArticles.filter(
      (article) => article.readAt === date
    );
  });

  const xReadDates = Object.keys(SortedArticles);
  console.log(SortedArticles)

  for (const [key, value] of Object.entries(SortedArticles)) {
    yReadCount.push(value.length);
  }

  const articleTrace = {
    x: xReadDates,
    y: yReadCount,
    name: 'Total Read',
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'red' },
  };

  data.push(articleTrace)

  const tagData = [];
  //Get individual read articles Tags
  const yTagCount = [];
  const articleTagsList = [];

  //Coordinated of tags, per tag, per day
  for (const [key, value] of Object.entries(SortedArticles)) {
    const dateTags = [];
    for (const article of value) {
      article.taggings.map(
        (tag) =>
          dateTags.push(tag.tag.name) && articleTagsList.push(tag.tag.name)
      );
    }
    yTagCount[key] = dateTags;
  }
  console.log(articleTagsList);

  //build trace for each tag name
  for (let i = 0; i < articleTagsList.length; i++) {
    const yTags = [];
    const tagDateMap = {};
    for (const day in yTagCount) {
      tagDateMap[day] = yTagCount[day].filter(
        (tag) => tag === articleTagsList[i]
      );
    }
    for (const [key, value] of Object.entries(tagDateMap)) {
      yTags.push(value.length);
    }
    const tagTrace = {
      x: xReadDates,
      y: yTags,
      name: articleTagsList[i],
      type: 'scatter',
      mode: 'markers',
      market: {opacity: .75}
    };
    console.log(tagTrace)
    data.push(tagTrace);
  }



  return (
    <Plot
      data={data}
      layout={{
        title: 'Lets Look At Your Articles Read Over Time!',
        width: 600,
        height: 750,
        barmode: 'stack',
        xaxis: {
          autorange: true,
          tickformat: "%a %d",
          range: ['2015-01-01', '2021-10-31'],
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
          rangeslider: { range: ['2015-01-01', '2021-10-31'] },
          type: 'date',
        },
        yaxis: {
          autorange: true,
          range: [86.8700008333, 138.870004167],
          type: 'linear',
        },
      }}
    />
  );
}
