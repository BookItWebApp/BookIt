import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
const { DateTime } = require('luxon');



export function TagRatio() {
  const userArticles = useSelector((state) => state.userArticles);
  const tagData = [];
  const yTagCount = [];
  const allTagsList = [];
  const sortedArticles = []
  const dateList = []
  const dateTags = [];

  //Get individual read articles Count
  const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );

   //Data Cleaning
  //  const dateCleanedArticles = readArticles.map((article) => {
  //   DateTime.fromISO(article).toFormat('yyyy-MM-dd')
  //   return article;
  // });

  readArticles.map((article) => {
    dateList.push(article.readAt);
  });

  dateList.sort();

  //tags per article
  const ArticleTagsList = {}
  //provides a list of articles and associated tags
   for (let i = 0; i < readArticles.length; i++) {
   let article = readArticles[i]
      ArticleTagsList[article.articleId] = article.taggings.map((tag) => tag.tag.name)
      }

      //sort articles by read all date
  dateList.map((date) => {
    sortedArticles[date] = readArticles.filter(
      (article) => article.readAt === date
    );
  });

  //Coordinated of tags, per tag, per day
  //need this
  for (const [key, value] of Object.entries(sortedArticles)) {
    const dateTags = [];
    for (const article of value) {
      article.taggings.map(
        (tag) =>
          dateTags.push(tag.tag.name) && allTagsList.push(tag.tag.name)
      );
    }
    yTagCount[key] = dateTags;
  }

   const result = {}
   for(let i=0 ; i <allTagsList.length; i++ ) {
    const tag = allTagsList[i]
    let tagCount = 0
    for (const [key, value] of Object.entries(ArticleTagsList)){
      if(value.includes(tag)){
        tagCount ++
     }
     }
     result[tag]=tagCount}



  const yTags = [];
  const tagDateMap = {};
  // build trace for each tag name
  for (let i = 0; i < allTagsList.length; i++) {
    for (const day in yTagCount) {
      tagDateMap[day] = yTagCount[day].filter(
        (tag) => tag === allTagsList[i]
      );
    }}
    // for articleTagsList
  // 'ytagCount' //need tags by article
  //
  for (const [key, value] of Object.entries(tagDateMap)) {
    yTags.push(value.length);
    }

  const tagTrace = [{
    labels: Object.keys(result),
    values: Object.values(result),
    name: 'Your Tags',
    type: 'pie'}]


  return (
    <Plot
      data={tagTrace}
      layout={{
        title: 'Your Tags',
        autosize: false,
        height:500}}
        />
        )
  }
