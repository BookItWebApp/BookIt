import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTab } from "../store/tab";
import { getExtensionUserArticles } from "../store/userArticles";
import { createNewExtensionArticle } from "../store/userArticles";

export default () => {
  //In Order: supplies URL, User info, and Tag info
  const tab = useSelector((state) => state.tab);
  const user = useSelector((state)=> state.auth)
  const articles = useSelector((state) => state.userArticles)
  const dispatch = useDispatch();

  useEffect(() => {
    //Current extension retrieves ALL tags instead of user Tags
    dispatch(getExtensionUserArticles(user.id))
    dispatch(fetchTab());
  }, [dispatch]);

 const handleSubmit=(event)=> {
    event.preventDefault();
    console.log('here')
    console.log(event)
    let userId = user.id;
    let article = {url: event.url, tags: event.tags};
    article.isPrivate = article.isPrivate === "true";
    dispatch(createNewExtensionArticle(article, userId))
}

  const indivTags = []
  articles.map((article)=> article.taggings.map((tag) => indivTags.push(tag.tag.name)))
  console.log(articles)
  console.log([])



  return (
    //new article is submitted to DB based on simple form POST submission direct to URL
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <form
        name="urlPOST"
        action="http://localhost:8080/api/articles/"
        method="POST"
        target="_self"
      >
        <label htmlFor="url">URL</label>
        <input type="url" type="text" name="url" value={tab.url} />
        <label htmlFor="tags">Tags</label>
        <input
          type="tags"
          type="text"
          name="tags"
          value={indivTags}
        />
        <input
          type="hidden"
          id = "userId"
          name="userId"
          value={user.id}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
