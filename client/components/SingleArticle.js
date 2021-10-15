import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { previewArticle } from "../store/SingleArticle";

export default function SingleArticle(props) {
  const article = props.article.article;
  const [metaData, setMetaData] = useState();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(previewArticle(article.url));
  // }, [dispatch]);
  // console.log(article)
  return (
    <div id ='container'>
      hello?
      
      {article.name}
      <a href={article.url}>{article.name}</a>
    </div>
  )
}
