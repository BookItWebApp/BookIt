import React from 'react';
import { useSelector } from 'react-redux';
const { DateTime } = require('luxon');
import Plot from 'react-plotly.js';

export function TagReadUnread() {
  const userArticles = useSelector((state) => state.userArticles);
  const SortedArticles = {}; //Sorted list of read articles by date read
  const dateList = [];
  const data = [];

  //Get individual read articles Count
  const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );

  readArticles.map((article) => {
    dateList.push(article.readAt);
  });

  dateList.sort();

  //creates sorted article
  dateList.map((date) => {
    SortedArticles[date] = readArticles.filter(
      (article) => article.readAt === date
    );
  });
  //-----------------------------tagData---------------------------------------//
  //-------------------Get Tags Total --------------------//
  const allTagsList = [];
  const ArticleTagsList = {};

  //tags per article
  //provides a list of articles and associated tags
  for (let i = 0; i < userArticles.length; i++) {
    let article = userArticles[i];
    ArticleTagsList[article.articleId] = article.taggings.map(
      (tag) => tag.tag.name
    );
  }

  //Coordinated of tags, per tag, per day
  for (const [key, value] of Object.entries(ArticleTagsList)) {
    for (const tag of value) {
      allTagsList.push(tag);
    }
  }

  //build list that will be used in tag ratio chart
  //uses allTagsList and ArticleTagsList
  const result = {};
  for (let i = 0; i < allTagsList.length; i++) {
    const tag = allTagsList[i];
    let tagCount = 0;
    for (const [key, value] of Object.entries(ArticleTagsList)) {
      if (value.includes(tag)) {
        tagCount++;
      }
    }
    result[tag] = tagCount;
  }


    //-------------------Get Tags of Read Articles --------------------//

    const yTagCount = [];
    const allReadTagsList = [];
    const dateTags = [];

    //tags per article
    const readArticleTagsList = {}
    //provides a list of articles and associated tags
     for (let i = 0; i < readArticles.length; i++) {
     let article = readArticles[i]
        readArticleTagsList[article.articleId] = article.taggings.map((tag) => tag.tag.name)
        }

    //Coordinated of tags, per tag, per day
    //need this
    for (const [key, value] of Object.entries(SortedArticles)) {
      const dateTags = [];
      for (const article of value) {
        article.taggings.map(
          (tag) =>
            dateTags.push(tag.tag.name) && allReadTagsList.push(tag.tag.name)
        );
      }
      yTagCount[key] = dateTags;
    }
    //build list that will be used in tag ratio chart
      //uses allReadTagsList and readArticleTagsList
     const readTagResult = {}
     for(let i=0 ; i <allReadTagsList.length; i++ ) {
      const tag = allReadTagsList[i]
      let tagCount = 0
      for (const [key, value] of Object.entries(readArticleTagsList)){
        if(value.includes(tag)){
          tagCount ++
       }
       }
       readTagResult[tag]=tagCount}

    const yTags = [];
    const tagDateMap = {};
    // build trace for each tag name
    for (let i = 0; i < allReadTagsList.length; i++) {
      for (const day in yTagCount) {
        tagDateMap[day] = yTagCount[day].filter(
          (tag) => tag === allReadTagsList[i]
        );
      }}
      // for readarticleTagsList
    // 'ytagCount' //need tags by article
    //
    for (const [key, value] of Object.entries(tagDateMap)) {
      yTags.push(value.length);
      }

    //build "Remaining Tags variable"
    const remainingTagResult = {}
    for (const [key, value] of Object.entries(result)){
      let totalarticles = result[key]
      let totalread = readTagResult[key]? readTagResult[key]:0
        remainingTagResult[key] = (totalarticles - totalread)
    }

    //build tagTraces
    const readTagTrace = {
      labels: Object.keys(readTagResult),
      values: Object.values(readTagResult),
      title: 'Read',
      textposition: 'inside',
      textinfo:'none',
      hole: .3,
      type: 'pie',
      domain: {
        row: 0,
        column: 0}}

      const remainingTagTrace = {
        labels: Object.keys(remainingTagResult),
        values: Object.values(remainingTagResult),
        title: 'Unread',
        textposition: 'inside',
        textinfo:'none',
        hole: .3,
        type: 'pie',
        domain: {
          row: 0,
          column: 1}}

    data.push(remainingTagTrace)
    data.push(readTagTrace)

  return (
    <div>
      <div align = 'center'>
    <h3>Tag Overview</h3>
    <h4>Divided by Article Read Status</h4>
    </div>
    <Plot
      data={data}
      layout = {{
        height: 500,
        width: 700,
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t:50,
          pad: 0,
        },
        showlegend: true,
        grid: {rows: 1,
              columns: 2,
              pattern: 'independent',
      }}}
      config={{
        "displaylogo": false,
        'modeBarButtonsToRemove': ['pan2d','lasso2d']
           }}
    />
    </div>
  );
}
