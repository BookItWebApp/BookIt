import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { previewArticle } from '../store/SingleArticle';

export function SingleArticle(props) {
  const dispatch = useDispatch();
  const articleData = useSelector((state) => state.metaData);

  const article = props.article;
  const taggings = article.taggings;

  useEffect(() => {
    dispatch(previewArticle(article.article.url, article.id));
  }, [dispatch]);

  //
  return (
    <div className="single-article--container">
      <a href={article.url}>
        Title: {article.name}
        <br />
      </a>
      Private: {article.isPrivate}
      <br />
      Tags:
      {taggings.map((tagging, idx) => {
        return <span key={idx.toString()}> {tagging.tag.name}</span>;
      })}
      <br />
      {article.article.authors ? (
        article.article.authors.length > 1 ? (
          <ul>
            By:
            {article.article.authors.map((author) => (
              <li key={author.id}>
                <NavLink to={`/authors/${author.id}`}>{author.name}</NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <span>
            By:{' '}
            <NavLink to={`/authors/${article.article.authors[0].id}`}>
              {article.article.authors[0].name}
            </NavLink>
          </span>
        )
      ) : (
        <React.Fragment />
      )}
      <span>
        <button>mark</button>
        <button>share</button>
      </span>
    </div>
  );
}
