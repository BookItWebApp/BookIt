import React from 'react';
import AuthorArticleItem from './AuthorArticleItem';

export default ({ articles }) => (
  <div className="article-list">
    {articles.map((article) => (
      <AuthorArticleItem key={article.id} article={article} />
    ))}
  </div>
);
