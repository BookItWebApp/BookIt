import React from 'react';
import { useSelector } from 'react-redux';
const { DateTime } = require('luxon');
import Plot from 'react-plotly.js';

export function TimeChart() {
  const userArticles = useSelector((state) => state.userArticles);
  const SortedArticles = {};
  const sortedaddedArticles = {}
  const yReadTotal = [];
  const dateList = [];
  const data = []
  const addedDateList= []
  let yhelperAdd = []
  const yTotalArticles =[]

  //Get individual read articles Count
  const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );
  //Data Cleaning
  // const dateCleanedArticles = readArticles.map((article) => {
  //   DateTime.fromISO(article).toFormat('yyyy-MM-dd')
  //   return article;
  // });

  // const allArticlesCleaned = userArticles.map((article) => {
  //   if (article.readAt!==null){
  //   article.readAt = article.readAt.substr(0, article.readAt.indexOf('T'));
  //   return article}
  //   else{
  //     return article
  //   }
  // });

  readArticles.map((article) => {
    dateList.push(article.readAt);
  });

  userArticles.map((article) => {
    addedDateList.push(article.createdAt);
  });

  addedDateList.sort()

  dateList.sort();


  dateList.map((date) => {
    SortedArticles[date] = readArticles.filter(
      (article) => article.readAt === date
    );
  });
  addedDateList.map((date) => {
    sortedaddedArticles[date] = userArticles.filter(
      (article) => article.createdAt === date
    );
  });

  const xReadDates = Object.keys(SortedArticles);
  const xAddedDates =Object.keys(sortedaddedArticles)

  for (const [key, value] of Object.entries(sortedaddedArticles)) {
    yhelperAdd.push(value.length);
  }

  for (let i =0; i <yhelperAdd.length; i++) {
    if(i===0){
    yTotalArticles.push(yhelperAdd[i])}
    else{
      yTotalArticles.push(yTotalArticles[i-1]+yhelperAdd[i])}
    }

  yhelperAdd=[]
  for (const [key, value] of Object.entries(SortedArticles)) {
    yhelperAdd.push(value.length);
  }

  for (let i =0; i <yhelperAdd.length; i++) {
    if(i===0){
      yReadTotal.push(yhelperAdd[i])}
    else{
      yReadTotal.push(yTotalArticles[i-1]+yhelperAdd[i])
    }
    }

    //add final date value to update graph to present
    xAddedDates.push(DateTime.now().toISO())
    let mostRecentValue = yTotalArticles.at(-1)
    yTotalArticles.push(mostRecentValue)

  const readArticleTrace = {
    x: [xReadDates[0],...xReadDates],
    y: [0,...yReadTotal],
    name: 'Total Read',
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'blue' },
    fill: 'tozeroy',
    line: {shape: 'spline'}
  };

  const addedArticleTrace = {
    x: xAddedDates,
    y: yTotalArticles,
    name: 'Total Added',
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'red' },
    fill: 'tozeroy',
    line: {shape: 'spline'}
  };



  console.log('trace',addedArticleTrace )
  data.push(readArticleTrace, addedArticleTrace)

  // const tagData = [];
  // //Get individual read articles Tags
  // const yTagCount = [];
  // const articleTagsList = [];

  // //Coordinated of tags, per tag, per day
  // for (const [key, value] of Object.entries(SortedArticles)) {
  //   const dateTags = [];
  //   for (const article of value) {
  //     article.taggings.map(
  //       (tag) =>
  //         dateTags.push(tag.tag.name) && articleTagsList.push(tag.tag.name)
  //     );
  //   }
  //   yTagCount[key] = dateTags;
  // }

  // //build trace for each tag name
  // for (let i = 0; i < articleTagsList.length; i++) {
  //   const yTags = [];
  //   const tagDateMap = {};
  //   for (const day in yTagCount) {
  //     tagDateMap[day] = yTagCount[day].filter(
  //       (tag) => tag === articleTagsList[i]
  //     );
  //   }
  //   for (const [key, value] of Object.entries(tagDateMap)) {
  //     yTags.push(value.length);
  //   }
  //   const tagTrace = {
  //     x: xReadDates,
  //     y: yTags,
  //     name: articleTagsList[i],
  //     type: 'scatter',
  //     mode: 'markers',
  //     market: {opacity: .75}
  //   };
  //   data.push(tagTrace);
  // }



  return (
    <Plot
      data={data}
      layout={{
        title: 'Lets Look At Your Articles Read Over Time!',
        width: 550,
        height: 550,
        barmode: 'stack',
        xaxis: {
          autorange: true,
          tickformat: "%B %Y",
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
          type: 'linear'

        },
      }}
    />
  );
  }

