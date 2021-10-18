import React from 'react';
import { NavLink } from 'react-router-dom';
import tagList, { sortTags } from '../helpers/tagList';

export default ({ article }) => {
  const popularTags = sortTags(tagList(article));

  return (
    <div className="article">
      <h2>{article.url}</h2>
      {article.authors ? (
        <ul>
          Co-Authors:
          {article.authors.map((author) => (
            <li key={author.id}>
              <NavLink to={`/authors/${author.id}`}>{author.name}</NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <React.Fragment />
      )}
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
