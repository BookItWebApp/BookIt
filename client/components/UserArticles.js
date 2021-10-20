import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SingleArticle } from "./SingleArticle";
import Topbar from "./Navigation/Topbar";
import { useHistory } from "react-router-dom";
import { getUserArticles } from "../store/userArticles";

export function UserArticles() {
    const articles = useSelector((state) => state.userArticles);
    const filteredTags = useSelector((state) => state.tags.filteredTags);

    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    articles.forEach((element) => {
        const tags = element.taggings.map((item) => item.tag.name);
        element.tags = tags;
    });

    useEffect(() => {
        dispatch(getUserArticles(user.id));
    }, [dispatch]);

    function clickHandlerShare() {
        history.push("/share/message");
    }

    if (articles.length === 0) {
        return (
            <div>
                <Topbar />
                <h3>You don't have any articles.</h3>
            </div>
        );
    }

    function validateFilter(tags) {
        if (filteredTags && filteredTags.length > 0) {
            // CHECK IF FILTEREDTAGS ARRAY CONTAIN ANY ELEMENT OF TAGS ARRAY
            // RETURN TRUE IF ANY ARTICLE CONTAINS THE FILTER TAGS
            const tag = tags.find((tag) => filteredTags.includes(tag));
            // console.log("tag is", tag);
            return tag != undefined;
        }
        // RETURN FALSE ARTICLE WITHOUT FILTERED LIST TAGS
        return true;
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
                {articles
                    .filter((article) => validateFilter(article.tags))
                    .map((article) => {
                        return (
                            <div key={article.id} className="singleContainer">
                                <SingleArticle article={article} />
                            </div>
                        );
                    })}
            </div>
            <button onClick={(e) => clickHandlerShare()} id="shareButton">
                Share list with my friends!
            </button>
        </div>
    );
}
