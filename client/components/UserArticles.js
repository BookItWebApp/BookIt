import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../store/userArticles';
import { SingleArticle } from './SingleArticle';
import { useHistory } from 'react-router-dom';
import Topbar from './Navigation/Topbar';

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
      <Topbar />
      Articles
      {articles.map((article) => {
        return (
          <div key={article.article.id} className="singleContainer">
            <SingleArticle article={article} />
          </div>
        );
      })}
      <button onClick={(e) => clickHandlerShare()} id="shareButton">
        Share list with my friends!
      </button>
    </div>
  );
}
