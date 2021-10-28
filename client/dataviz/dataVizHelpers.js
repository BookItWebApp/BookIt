//This file contains shared helper functions for data cleaning
const { DateTime } = require('luxon');

//USER ARTICLE HELPER FUNCTIONS

  const dateList=[]
  const sortedArticles = {};

  // ------Get Read Articles---------//
export function sortReadArticles(userArticles) {
  return userArticles.filter(
  (article) => article.readAt !== null
)}

//------Read Articles Date Sorted---------//
///Returns object with keys made of sorted readDates and list of articles
///read that day
  export function readArticlesDates(userArticles){
    const readArticles = sortReadArticles(userArticles)
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

//------All Articles And Tags---------//
  //provides a list of articles and associated tags
  export function allArticlesTags (userArticles) {
    const ArticleTagsList = {}
  for (let i = 0; i < userArticles.length; i++) {
    let article = userArticles[i];
    ArticleTagsList[article.articleId] = article.taggings.map(
      (tag) => tag.tag.name
    );
  } return ArticleTagsList}

//------Only Read Articles And Tags---------//
export function readArticlesTags(userArticles){
  const readArticleTagsList = {}
  const readArticles = sortReadArticles(userArticles)
  for (let i = 0; i < readArticles.length; i++) {
    let article = readArticles[i]
       readArticleTagsList[article.articleId] = article.taggings.map((tag) => tag.tag.name)
       }
  return readArticleTagsList
}

//------All USer Tags List---------//
export function allUserTagsList(userArticles){
  const allTagsList =[]
  const ArticleTagsList = allArticlesTags(userArticles)
  for (const [key, value] of Object.entries(ArticleTagsList)) {
    for (const tag of value) {
     allTagsList.push(tag);
    }
  }
  return allTagsList
}

//------Count Tag Totals in a Tag Grouping---------//
export function tagCounter(tagList, tagGrouping){
  const tagCountList = {}
  for(let i=0 ; i <tagList.length; i++ ) {
   const tag = tagList[i]
   let tagCount = 0
   for (const [key, value] of Object.entries(tagGrouping)){
     if(value.includes(tag)){
       tagCount ++
    }
    }
    tagCountList[tag]=tagCount}
    return tagCountList

}
