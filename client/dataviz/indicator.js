import React, { useEffect, useState }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
const { DateTime } = require('luxon');
import Plot from 'react-plotly.js';
import { render } from 'react-dom';
import {previewArticle} from '../store/SingleArticle'



export function Indicator() {
  const dispatch = useDispatch();
  const userArticles = useSelector((state) => state.userArticles);
  const metaData = useSelector((state) => state.metaData);
  const dateList = [];
  const SortedArticles = [];


  //Get individual read articles Count
  const userArticlesCopy = [...userArticles]
  const readArticles = userArticlesCopy.filter(
    (article) => article.readAt !== null
  );

  readArticles.map((article) => {
    dateList.push(article.readAt);
  });

  dateList.sort();

  dateList.map((date) => {
    SortedArticles[date] = readArticles.filter(
      (article) => article.readAt === date
    );
  });

  //get this weeks time
  const thisWeekStart = DateTime.now().startOf('week').toISO();
  const timeNow = DateTime.now().toISO();
  const lastWeekStart = DateTime.now()
    .startOf('week')
    .minus({ days: 7 })
    .toISO();

  let articlesThisWk = []
  //get articles read this week
  Object.keys(SortedArticles).map((key) => {
    let keyDate = DateTime.fromISO(key).toISO();
    if (keyDate >= thisWeekStart) {
      articlesThisWk.push(...SortedArticles[key]);
    }
  });

  //get article count read last week
  const articlesLastWk = [];
  Object.keys(SortedArticles).map((key) => {
    let keyDate = DateTime.fromISO(key).toISO();
    if (keyDate < thisWeekStart && keyDate >= lastWeekStart) {
      articlesLastWk.push(...SortedArticles[key]);
    }
  });
  const indicatorTrace = [
    {
      type: 'indicator',
      mode: 'number+delta',
      value: articlesThisWk.length,
      delta: { reference: articlesLastWk.length, position: 'top' },
      domain: { x: [0, 1], y: [0, 1] },
    },
  ];
  // console.log(metaData)

  useEffect(() => {
    for (let i=0; i< articlesThisWk.length; i++)
   dispatch(previewArticle(articlesThisWk[i].article.url, articlesThisWk[i].id));
 }, [articlesThisWk.length]);

   //map metadata
   useEffect(() => {
  for (let i=0; i< articlesThisWk.length; i++){
    for (let j=0; j<metaData.length; j++)
    if (articlesThisWk[i].id ===metaData[j].articleId){
      articlesThisWk[i]['metadata'] = metaData[j]
    }
  }}, [metaData.length])

  return (
    <div className='dataviz-row'>
      <div >
        <Plot
          data={indicatorTrace}
          layout={{
            title: 'Articles This Week',
            height: 200,
            width: 200,
            margin: {
              l: 0,
              r: 0,
              b: 5,
              t: 50,
              pad: 0,
            },
          }}
           config={{
        "displaylogo": false,
        'modeBarButtonsToRemove': ['pan2d','lasso2d']
           }}
        />
      </div>
      <table>
        <thead>
          <th>Articles Read</th>
        </thead>
        <tbody >
        {articlesThisWk.map((article) => {
          return (
            <tr key={article.id}>
              {console.log(article)}
              <a href={article.url}> {article.name}</a>
               {article.metadata?
               <div c>
                <td><img src={article.metadata.logo}/></td>
                <td><div>{article.metadata.title}</div></td>
                <td><div>{article.metadata.publisher}</div></td>
                </div>:
               <div></div>
               }
             </tr>)})}
        </tbody>
        </table>
        </div>
  )
  }



 // {article.metadata.logo? <img src={logo}/> : <div></div>} */
