import React from 'react';

export function SingleSharing(props) {
  const article = props.article;
  return (
    <div>
      <span>{article.userArticle.name}</span>
      <a href={article.userArticle.article.url}> {article.userArticle.name} </a>
      <span>{article.userArticle.note}</span>
    </div>
  );
}
