import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SingleArticle } from './SingleArticle';
import Topbar from './Navigation/Topbar';
import { useHistory } from 'react-router-dom';
import { getUserArticles } from '../store/userArticles';

export function UserArticles() {
  const articles = useSelector((state) => state.userArticles);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserArticles(user.id));
  }, [dispatch]);

  function clickHandlerShare() {
    history.push('/share/message');
  }

  function clickHandlerTabView() {
    history.push('/home/tab');
  }

  if (articles.length === 0) {
    return (
      <div>
        <Topbar />
        <h3>You don't have any articles.</h3>
      </div>
    );
  }

  return (
    <div>
      <Topbar />
      <Link to="/tableview">
        <p className="user-articles--display-view">Show me table view</p>
      </Link>
      <h3>Articles</h3>
      <div className="display-articles--container">
        {articles.map((article) => {
          return (
            <div key={article.id} className="singleContainer">
              <SingleArticle article={article} />
            </div>
          );
        })}
      </div>
      <button onClick={(e) => clickHandlerTabView()} id="tabViewButton">
        Show me table view
      </button>
      <button onClick={(e) => clickHandlerShare()} id="shareButton">
        Share list with my friends!
      </button>
    </div>
  );
}
