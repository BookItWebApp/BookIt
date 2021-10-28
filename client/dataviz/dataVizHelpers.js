//This file contains shared helper functions for data cleaning
const { DateTime } = require('luxon');

//USER ARTICLE HELPER FUNCTIONS

  const dateList=[]
  const sortedArticles = {};

//Read Articles Sorted
///Returns object with keys made of sorted readDates and list of articles
///read that day
  export function readArticlesDates(userArticles){
    const readArticles = userArticles.filter(
    (article) => article.readAt !== null
  )
    readArticles.map((article) => {
      dateList.push(article.readAt);
  });
  dateList.sort();

  dateList.map((date) => {
    let formattedDate = DateTime.fromISO(date).toFormat('yyyy-MM-dd')
    sortedArticles[formattedDate] = readArticles.filter(
      (article) => article.readAt === date
    );
  })

  return sortedArticles}
