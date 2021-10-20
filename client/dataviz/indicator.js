import React from 'react';
import { useSelector } from 'react-redux';
const { DateTime } = require('luxon');
import Plot from 'react-plotly.js';

export function Indicator() {
  const userArticles = useSelector((state) => state.userArticles);
  const dateList =[]
  const SortedArticles = []

   //Get individual read articles Count
   const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  );

  readArticles.map((article) => {
    dateList.push(article.readAt);
  });

  dateList.sort();

  dateList.map((date) => {
    SortedArticles[date] = readArticles.filter(
      (article) => article.readAt === date
    )})

    console.log(SortedArticles)

  //get this weeks time
  const thisWeekStart = DateTime.now().startOf('week').toISO();
  const timeNow = DateTime.now().toISO();
  const lastWeekStart = DateTime.now().startOf('week').minus({ days: 7 }).toISO()

  //get article count read this week
   const articlesThisWk = []
  Object.keys(SortedArticles).map(key =>
    {let keyDate = DateTime.fromISO(key).toISO()
      if(keyDate>=thisWeekStart){
    articlesThisWk.push(SortedArticles[key])
  }
})

//get article count read last week
  const articlesLastWk = []
Object.keys(SortedArticles).map(key =>
  {let keyDate = DateTime.fromISO(key).toISO()
    if(keyDate<thisWeekStart&&keyDate>=lastWeekStart){
      articlesLastWk.push(SortedArticles[key])
}
})

  console.log(articlesLastWk)

  const indicatorTrace = [{
    type: "indicator",
    mode: "number+delta",
    value: articlesThisWk.length,
    delta:{reference: articlesLastWk.length, position: "top"}}]





  return(
    <Plot
    data ={indicatorTrace}
    layout ={{
      title: "Articles This Week"
    }}

    />

  )
}
