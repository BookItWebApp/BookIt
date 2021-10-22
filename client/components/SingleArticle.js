import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { previewArticle } from "../store/SingleArticle";
import { markUserArticle, deleteProduct } from "../store/userArticles";

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
        article.readAt = new Date().toISOString();
        dispatch(markUserArticle(user.id, article));
    }

    function deleteBookmark() {
        console.log("DELTE", user.id, article);
        dispatch(deleteProduct(article.id, article));
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
            Private: {article.isPrivate ? "True" : "False"}
            <br />
            Tags:
            {taggings.map((tagging, idx) => {
                return <span key={idx.toString()}> {tagging.tag.name}</span>;
            })}
            <br />
            <span>
                <button onClick={markAsCompleted}>mark</button>
            </span>
            <span>{article.readAt ? "Read" : "Unread"}</span>
            <span>
                <button onClick={deleteBookmark}>delete</button>
            </span>
        </div>
    );
}
