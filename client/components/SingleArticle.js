import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previewArticle } from '../store/SingleArticle';

export function SingleArticle(props) {
  const article = props.article;
  const articleData = useSelector((state) => state.metaData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(previewArticle(article.article.url, article.id));
  }, [dispatch]);

  return (
    <div>
      <h2>{articleData.title}</h2>
      <img src={articleData.image}/>
      <img src={articleData.logo} />
      <div>{articleData.title}</div>
      <a href={article.article.url}> {article.name} </a>
      <div>{articleData.description}</div>
      <div>{articleData.publisher}</div>
    </div>
  );
}
