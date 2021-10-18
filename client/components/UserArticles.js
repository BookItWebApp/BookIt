import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../store/userArticles";
import { useDispatch, useSelector } from "react-redux";
import { SingleArticle } from "./SingleArticle";
import Topbar from "./Navigation/Topbar";

export function UserArticles() {
    //ref: https://thoughtbot.com/blog/using-redux-with-react-hooks
    const articles = useSelector((state) => state.userArticles);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArticles(user.id));
    }, [dispatch]);

    // console.log("ARTICLES > ", articles);
    // console.log("ARTICLES USER > ", user);

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
                <p className="user-articles--display-view">
                    Show me table view
                </p>
            </Link>
            <h3>Articles</h3>
            <div className="display-articles--container">
                {articles.map((article) => {
                    console.log("ARTICLE===", article);
                    return (
                        <div key={article.id} className="singleContainer">
                            <SingleArticle article={article} />
                        </div>
                    );
                })}
            </div>
            <Link to="/sharelist">
                <p className="user-articles--share-list">
                    Share my list with friends
                </p>
            </Link>
        </div>
    );
}
