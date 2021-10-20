/**
 *
 * @param  {...any} objs
 * @returns {any} returns an object that merges the objects passed into it, any
 * matching keys have their values summed together
 */
const sumMergeObj = (...objs) => {
  return objs.reduce((acc, cur) => {
    for (let prop in cur) {
      if (acc[prop]) {
        acc[prop] += cur[prop];
      } else {
        acc[prop] = cur[prop];
      }
    }
    return acc;
  }, {});
};

/**
 * @param  {...any} articles
 * @returns {any} returns an object that contains all the tags, and the number
 * of occurrences those tags have on the list of article(s)
 */
const tagList = (...articles) => {
  return articles.reduce((acc, cur) => {
    return sumMergeObj(
      acc,
      cur.userArticles.reduce((userArticleAcc, userArticleCur) => {
        return sumMergeObj(
          userArticleAcc,
          userArticleCur.taggings.reduce((taggingsAcc, taggingsCur) => {
            const name = taggingsCur.tag.name;
            if (taggingsAcc[name]) {
              taggingsAcc[name] += 1;
            } else {
              taggingsAcc[name] = 1;
            }
            return taggingsAcc;
          }, {})
        );
      }, {})
    );
  }, {});
};

/**
 * @param {*} tagListObject
 * @param {*} n The number of items you want to display in the list, defaults to
 * the entire list
 * @returns {any[]} returns a sorted list of every tag, with the most associated
 * tag appearing first, limited by n entries
 */
export const sortTags = (tagListObject, n = tagListObject.length) => {
  let sortedTags = [];

  for (let tag in tagListObject) {
    sortedTags.push([tag, tagListObject[tag]]);
  }
  sortedTags.sort((a, b) => a[1] - b[1]);

  return sortedTags.map((tag) => tag[0]).slice(0, n);
};

export default tagList;
