import React from 'react';
import tagList, { sortTags } from '../helpers/tagList';

export default ({ article }) => {
  const popularTags = sortTags(tagList(article));

  return (
    <div className="article">
      <h2>{article.url}</h2>
      {popularTags.length > 0 ? (
        <ul>
          Popular Tags
          {popularTags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};
