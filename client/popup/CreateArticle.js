import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTab } from "../store/tab";
import { getExtensionUserArticles } from "../store/userArticles";
import { createNewExtensionArticle } from "../store/userArticles";
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';

export default () => {
  //In Order: supplies URL, User info, and Tag info
  const tab = useSelector((state) => state.tab);
  const user = useSelector((state)=> state.auth)
  const articles = useSelector((state) => state.
  userArticles)
  const dispatch = useDispatch();
  const [tags, setTags] = useState(null)

  useEffect(() => {
    //Current extension retrieves ALL tags instead of user Tags
    dispatch(getExtensionUserArticles(user.id))
    dispatch(fetchTab());
  }, [dispatch]);

  function handleChange(options) {
    console.log('options',options)
    let tagArray =[]
    for (let i=0;i<options.length;i++){
      tagArray.push(options[i].value)}
      setTags(tagArray)
}
console.log('tab',tab)

//  const handleSubmit=(event)=> {
//     event.preventDefault();
//     console.log('here')
//     console.log(event)
//     let userId = user.id;
//     let article = {url: event.url, tags: event.tags};
//     article.isPrivate = article.isPrivate === "true";
//     dispatch(createNewExtensionArticle(article, userId))
// }

  const tagOptions = []
  articles.map((article)=> article.taggings.map((tag) => tagOptions.push({value:tag.tag.name, label:tag.tag.name})))



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
        <label htmlFor="url">Article URL</label>
        <input type="url" type="text" name="url" value={tab.url} />

        <label htmlFor="name">Name Article</label>
        <input type="ntext" type="text" name="name" />

        <input
          type="hidden"
          id="tags"
          name="tags"
          value={tags}
        />
        <input
          type="hidden"
          id = "userId"
          name="userId"
          value={user.id}
        />
      <label htmlFor="tagsetter">Choose Article Tags</label>
      <CreatableSelect id='tagsetter'
        isMulti
        onChange={handleChange}
        options={tagOptions}/>.
        <input type="submit" />
        </form>
    </div>
  );
};
