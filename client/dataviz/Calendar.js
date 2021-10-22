import React from 'react';
import { useSelector } from 'react-redux';
const { DateTime } = require('luxon');
import Plot from 'react-plotly.js';

export function Calendar() {
  const userArticles = useSelector((state) => state.userArticles);
  const dateList = [];
  const sortedArticles = {};

  //REARRAGE USERARTICLES TO DATE FORMAT
  //Get individual read articles Count
  const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );
    // console.log('readArticles',readArticles)

  // const dateCleanedArticles = readArticles.map((article) => {
  //   article.readAt = DateTime.fromISO(article.readAt).toFormat('yyyy-MM-dd')
  //   return article;

  // });

  // console.log('dateCleanedArticles',dateCleanedArticles)

  readArticles.map((article) => {
    dateList.push(article.readAt);
  });
  dateList.sort();
  console.log

  dateList.map((date) => {
    sortedArticles[date] = readArticles.filter(
      (article) => article.readAt === date
    );
  });

  // console.log('dateList', dateList)

  //potentially adjustable year component
  // let curentYear = year
  // if (curentYear === null) {}
  const today = new Date();
  let curentYear = today.getFullYear();

  //set Start and end dates of Calendar
  const startDate = new Date();
  startDate.setFullYear(curentYear, 0, 1);
  const endDate = new Date();
  endDate.setFullYear(curentYear, 11, 31);

  // const delta = endDate-startDate
  //set timeline values
  const month_names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //get list of dates between start and end
  function getDates(startDate, endDate) {
    let dateArray = [];
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      dateArray.push(new Date(date).toISOString());
    }
    return dateArray;
  }

  const zdata = [];
  let calendarDates = getDates(startDate, endDate);
  let weekDaysinYear = calendarDates.map((day) => DateTime.fromISO(day).weekday);
  let weekNumber = calendarDates.map((day) => DateTime.fromISO(day).weekNumber);
  const text = calendarDates.map((day) => DateTime.fromISO(day).toFormat(
    'yyyy-MM-dd'
  ))
  // console.log('calendarDates',sortedArticles)
  //    console.log('sortedArticles',sortedArticles)
  if (Object.keys(sortedArticles).length > 0) {
    // //build Z axis data
    let weekArray = [];
    // let weekCount = 0;
    perday: for (let i = 0; i <= calendarDates.length; i++) {
      let calendarDate = DateTime.fromISO(calendarDates[i]).toFormat(
        'yyyy-MM-dd'
      );
      const keyDates = Object.keys(sortedArticles);
      // if (i !== 0 && i % 7 === 0) {
      //   zdata.push(weekArray);
      //   weekArray = [];
      // }
      for (let j = 0; j < keyDates.length; j++) {
        if (calendarDate === keyDates[j]) {
          zdata.push(sortedArticles[keyDates[j]].length);
          continue perday;
        }
      }
      zdata.push(0);
    }
  }

  // console.log(zdata)
  const calendarTrace = [
    {
      x: weekNumber,
      y: weekDaysinYear,
      z: zdata,
      xgap: 3,
      ygap: 3,
      type: 'heatmap',
      showscale: false,
      text:text,
      hoverinfo:'text',
      colorscale: [
        ['0.0', '#CCD1D1'],
        [true, '#2ECC71']]
    },
  ];

  return (
    <Plot
      data={calendarTrace}
      layout={{
        title: 'Calendar of Activity',
        // plot_bgcolor:('rgb(0,0,0)'),
        autosize: false,
        height:300,
        width: 1200,

        yaxis: {
          showline: true,
          tickmode: 'array',
          ticktext: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          tickvals: [1, 2, 3, 4, 5, 6,7],
          title: 'Weekdays',
        },
        xaxis:{
          showline:false,
          showgrid:false,
          zeroline:false,
          tickmode:'array',
          ticktext:month_names,
          tickvals:[4,8,12,18,22,26,30,34,38,42,46,50]
      }}}
    />
  );
}
