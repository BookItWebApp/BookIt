import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { previewArticle } from "../store/SingleArticle";

export function SingleArticle(props) {
    const dispatch = useDispatch();
    const articleData = useSelector((state) => state.metaData);

    const article = props.article;
    const taggings = article.taggings;

    useEffect(() => {
        dispatch(previewArticle(article.article.url, article.id));
    }, [dispatch]);

    //
    return (
        <div className="single-article--container">
            <a href={article.url}>
                Title: {article.name}
                <br />
            </a>
            Private: {article.isPrivate}
            <br />
            Tags:
            {taggings.map((tagging, idx) => {
                return <span key={idx.toString()}> {tagging.tag.name}</span>;
            })}
            <br />
            <span>
                <button>mark</button>
                <button>share</button>
            </span>
        </div>
    );
}
