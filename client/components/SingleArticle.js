import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { previewArticle } from "../store/SingleArticle";
import { markUserArticle, deleteProduct } from "../store/userArticles";

export function SingleArticle(props) {
    const dispatch = useDispatch();
    const articleMetaData = useSelector((state) => state.metaData);
    const user = useSelector((state) => state.auth);
    const article = props.article;
    const taggings = article.taggings;
    const tags = article.tags;

    function markAsCompleted() {
        if (article.readAt) {
            article.readAt = null;
        } else {
            article.readAt = new Date().toISOString();
        }
        dispatch(markUserArticle(user.id, article));
    }

    function deleteBookmark() {
        dispatch(deleteProduct(article.id, article));
    }

    return (
        <div className="single-article--container">
            <div className="title-delete--single-article--container">
                <span className="title-name--single-article">
                    <span className="bold--single-article--container">
                        Title:
                    </span>{" "}
                    <span>{article.name}</span>
                </span>
                <span className="x"></span>
                <span>
                    <button
                        onClick={deleteBookmark}
                        className="pure-button delete-btn--single-article"
                    >
                        x
                    </button>
                </span>
            </div>
            <span className="bold--single-article--container">Url</span>
            <a href={article.article.url}>
                :{" "}
                <span className="article-name--single-article">
                    {article.article.url.slice(0, 30) + "..."}
                </span>
            </a>
            <br />
            <span className="bold--single-article--container">Note</span>:{" "}
            {article.note ? `${article.note}` : "none"}
            <br />
            <span className="bold--single-article--container">Tags</span>:{" "}
            {taggings.length
                ? taggings
                      .map((tagging, idx) => {
                          return (
                              <span key={idx.toString()}>
                                  {" "}
                                  {tagging.tag.name}
                              </span>
                          );
                      })
                      .reduce((prev, curr) => {
                          return [prev, ", ", curr];
                      })
                : "none"}
            <br />
            <div>
                <div>
                    <span className="bold--single-article--container">
                        Status
                    </span>
                    : {article.readAt ? "read" : "unread"}
                </div>
                <div className="footer--single-article--container">
                    {article.readAt ? (
                        <button
                            onClick={markAsCompleted}
                            className="pure-button read-btn--single-article read-btn-true"
                        >
                            mark as unread
                        </button>
                    ) : (
                        <button
                            onClick={markAsCompleted}
                            className="pure-button read-btn--single-article read-btn-false"
                        >
                            mark as read
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
