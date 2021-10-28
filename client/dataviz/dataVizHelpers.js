//This file contains helper functions for data cleaner

const { DateTime } = require('luxon');

//USER ARTICLE HELPER FUNCTIONS
  //Read Articles Per Date
  const dateList=[]
  const sortedArticles = {};

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
