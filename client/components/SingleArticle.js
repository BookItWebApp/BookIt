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
    console.log("ARTiCLE> ", article);

    // useEffect(() => {
    //   dispatch(previewArticle(article.article.url, article.id));
    // }, [dispatch]);

    function markAsCompleted() {
        // alert("trying to complete item with an id of " + user.id);
        article.readAt = new Date().toISOString();
        // console.log("MARK AS REEAD > ", article);
        dispatch(markUserArticle(user.id, article));
    }

    function deleteBookmark() {
        // console.log("DELTE", user.id, article);
        dispatch(deleteProduct(article.id, article));
    }

    //
    return (
        <div className="single-article--container">
            <div className="title-delete--single-article--container">
                <span className="title-name--single-article">
                    <span className="bold--single-article--container">
                        Title
                    </span>
                    <a href={article.article.url}>
                        :{" "}
                        <span className="article-name--single-article">
                            {article.name}
                        </span>
                    </a>
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
            <span className="bold--single-article--container">Private</span>:{" "}
            {article.isPrivate ? "yes" : "no"}
            <br />
            <span className="bold--single-article--container">Tags</span>:{" "}
            {taggings.length
                ? taggings.map((tagging, idx) => {
                      return (
                          <span key={idx.toString()}> {tagging.tag.name}</span>
                      );
                  })
                : "none"}
            <br />
            {/* {article.article.authors && article.article.authors.length > 0 ? (
                article.article.authors.length > 1 ? (
                    <ul>
                        By:
                        {article.article.authors.map((author) => (
                            <li key={author.id}>
                                <NavLink to={`/authors/${author.id}`}>
                                    {author.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <span>
                        By:{" "}
                        <NavLink
                            to={`/authors/${article.article.authors[0].id}`}
                        >
                            {article.article.authors[0].name}
                        </NavLink>
                        <button onClick={markAsCompleted}>mark</button>
                    </span>
                )
            ) : (
                <React.Fragment />
            )} */}
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
                            read
                        </button>
                    ) : (
                        <button
                            onClick={markAsCompleted}
                            className="pure-button read-btn--single-article read-btn-false"
                        >
                            unread
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
