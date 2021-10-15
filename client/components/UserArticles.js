import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../store/userArticles';
import {SingleArticle} from './SingleArticle'
import Topbar from './Navigation/Topbar';


export function UserArticles() {
  //ref: https://thoughtbot.com/blog/using-redux-with-react-hooks
  const articles = useSelector((state) => state.userArticles);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(user.id));
  }, [dispatch]);

  return (
    <div>
      <Topbar />
      Articles
      {articles.map((article) => {
        return (
          <div key={article.article.id} className="singleContainer">
            <SingleArticle article = {article}/>
          </div>
        );
      })}
    </div>
  );
}
