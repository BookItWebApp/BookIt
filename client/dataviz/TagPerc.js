import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
const { DateTime } = require('luxon');



export function TagRatio() {
  const userArticles = useSelector((state) => state.userArticles);
  const tagData = [];
  const yTagCount = [];
  const articleTagsList = [];
  const sortedArticles = []
  const dateList = []
  const dateTags = [];

  //Get individual read articles Count
  const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );

   //Data Cleaning
   const dateCleanedArticles = readArticles.map((article) => {
    DateTime.fromISO(article).toFormat('yyyy-MM-dd')
    return article;
  });

  dateCleanedArticles.map((article) => {
    dateList.push(article.readAt);
  });

  dateList.sort();

  dateList.map((date) => {
    sortedArticles[date] = dateCleanedArticles.filter(
      (article) => article.readAt === date
    );
  });

  //Coordinated of tags, per tag, per day
  for (const [key, value] of Object.entries(sortedArticles)) {
    const dateTags = [];
    for (const article of value) {
      article.taggings.map(
        (tag) =>
          dateTags.push(tag.tag.name) && articleTagsList.push(tag.tag.name)
      );
    }
    yTagCount[key] = dateTags;
  }

  console.log('tagcount', articleTagsList)
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

    console.log('ytags',yTags)
    const tagTrace = {
      labels: articleTagsList,
      values: yTags,
      name: articleTagsList[i],
      type: 'pie',
    };
  }



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
//   console.log(tagTrace)
//   data.push(tagTrace);

return (
  <div>
    hello?
  </div>


)
}
