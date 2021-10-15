import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previewArticle } from '../store/SingleArticle';

export function SingleArticle(props) {
  const article = props.article;
  const articleData = useSelector((state) => state.metaData);
  const dispatch = useDispatch();
  const taggings = article.taggings

  useEffect(() => {
    dispatch(previewArticle(article.article.url, article.id));
  }, [dispatch]);

  //
  return (
    <div>
      <a href={article.article.url}> {article.name} </a>
    </div>
  );
}
