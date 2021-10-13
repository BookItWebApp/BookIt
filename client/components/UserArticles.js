import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../store/userArticles";

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
      Articles
      {articles.map((article) => {
        return (
          <div key={article.article.id} className="singleContainer">
            <div>
              <a href={article.article.url}>{article.name}</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
