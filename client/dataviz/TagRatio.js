import React from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
const { DateTime } = require('luxon');


//Turn this into a TOTAL TAGS Chart

export function TagRatio() {
  const userArticles = useSelector((state) => state.userArticles);
  const allTagsList = [];


  //tags per article
  const ArticleTagsList = {}
  //provides a list of articles and associated tags
   for (let i = 0; i < userArticles.length; i++) {
   let article = userArticles[i]
      ArticleTagsList[article.articleId] = article.taggings.map((tag) => tag.tag.name)
      }

  //Coordinated of tags, per tag, per day
  for (const [key, value] of Object.entries(ArticleTagsList)) {
    for (const tag of value) {
          allTagsList.push(tag)
    }}

  //build list that will be used in tag ratio chart
    //uses allTagsList and ArticleTagsList
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
        height:550}}
        />
        )
  }
