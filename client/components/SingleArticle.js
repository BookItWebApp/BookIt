import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { previewArticle } from "../store/SingleArticle";
import { markUserArticle } from "../store/userArticles";

export function SingleArticle(props) {
    const dispatch = useDispatch();
    const articleData = useSelector((state) => state.metaData);
    const user = useSelector((state) => state.auth);


    const article = props.article;
    const taggings = article.taggings;

    useEffect(() => {
      dispatch(previewArticle(article.article.url, article.id));
    }, [dispatch]);

    function markAsCompleted() {
      // alert("trying to complete item with an id of " + user.id);
      article.readAt = new Date().toISOString();
      console.log('MARK AS REEAD > ', article);
      dispatch(markUserArticle(user.id, article));
    }
    //
    return (
      <div className="single-article--container">
        <a href={article.url}>
          <span className="title-name--single-article">
            Title: {article.name}
          </span>
          <br />
        </a>
        <div className="addAuthorButton">
          <button onClick={() => props.addAuthor(article.article.id)}>
            I wrote this!
          </button>
        </div>
        Private: {article.isPrivate ? 'True' : 'False'}
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
          <button onClick={markAsCompleted}>mark</button>
          <button>share</button>
        </span>
        <span>{article.readAt ? 'Read' : 'Unread'}</span>
      </div>
    );
}
