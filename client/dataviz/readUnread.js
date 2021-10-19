// import React from 'react';
// import { useSelector } from 'react-redux';
// import Plot from 'react-plotly.js';

// export function ReadRatio() {
//   const userArticles = useSelector((state) => state.userArticles);

//   return (
//     <div>
//       hello?
//     </div>
//   );
// }

// const tagData = [];
// //Get individual read articles Tags
// const yTagCount = [];
// const articleTagsList = [];

// //Coordinated of tags, per tag, per day
// for (const [key, value] of Object.entries(SortedArticles)) {
//   const dateTags = [];
//   for (const article of value) {
//     article.taggings.map(
//       (tag) =>
//         dateTags.push(tag.tag.name) && articleTagsList.push(tag.tag.name)
//     );
//   }
//   yTagCount[key] = dateTags;
// }
// console.log(articleTagsList);

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
// }
