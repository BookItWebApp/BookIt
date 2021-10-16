import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../store/userArticles';
import { SingleArticle } from './SingleArticle';
import { useHistory } from 'react-router-dom';

export function UserArticles() {
  //ref: https://thoughtbot.com/blog/using-redux-with-react-hooks
  const articles = useSelector((state) => state.userArticles);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getArticles(user.id));
  }, [dispatch]);

  function clickHandlerShare() {
    history.push('/share/message');
  }

  return (
    <div>
      Articles
      {articles.map((article) => {
        return (
          <div key={article.article.id} className="singleContainer">
            <div>
              {/* <a href={article.article.url}>{article.name}</a> */}
              <SingleArticle article={article} />
            </div>
          </div>
        );
      })}
      <button onClick={(e) => clickHandlerShare()} id="shareButton">
        Share list with my friends!
      </button>
    </div>
  );
}
