import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

import { getUserArticles, createNewArticle } from "../store/userArticles";

function CreateArticle() {
    const token = window.localStorage.getItem("token");
    // console.log("CreateArticle FOUND TOKEN> ", token);

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);
    const articles = useSelector((state) => state.userArticles);
    // console.log("CreateArticle ARTICLES > ", articles);

    const [submitted, setSubmitted] = useState(false);
    const [bookmarkName, setBookmarkName] = useState("");
    const [bookmarkUrl, setBookmarkUrl] = useState("");
    const [note, setNote] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(getUserArticles(user.id, token));
    }, [dispatch]);

    // =>
    function handleTagChange(options) {
        let tagArray = [];
        for (let i = 0; i < options.length; i++) {
            tagArray.push(options[i].value);
        }
        setTags(tagArray);
    }

    let tagOptions = []; // CREATE TAG OPTION ARR TO HOLD UNIQUE TAGGINGS
    let errObj; // CREATE ERR_OBJ TO HOLD ERRS FROM BACK-END

    // => FUNC TO RETURN UNIQUE TAG OPTION, NO DUPLICATES
    const uniqueTaggingOptions = (articles) => {
        let tagsArr = [];
        articles.map((article) => {
            if (!article.taggings) {
                let customErr = articles.pop(); // REMOVE LAST ITEM FROM ARTICLES WHICH IS AN ERR RETURNED FROM BACK-END
                // console.log("CUSTOM ERR > ", customErr);

                errObj = Object.assign(customErr);
                // errObj = Object.assign(articles[articles.length - 1]);

                // console.log("CUSTOM OBJ ERR > ", errObj);
                // console.log("tagsArr > ", tagsArr);
            } else if (article.taggings) {
                return article.taggings.map((tag) =>
                    tagsArr.push({ value: tag.tag.name, label: tag.tag.name })
                );
            }
        });
        let vals = tagsArr.map((obj) => obj.value); // RETURN ARR OF OBJ VALUES
        // RETUNS UNIQUE ARRAY OF TAGGS OBJ TO DISPLAY IN SELECT-DROPDOWN
        tagOptions = tagsArr.filter(
            ({ value }, index) => !vals.includes(value, index + 1)
        );
    };
    uniqueTaggingOptions(articles);

    // console.log("FINAL CUSTOM OBJ > ", errObj);
    // console.log("FINAL tagOptions > ", tagOptions);

    // TEST
    // Hook posts
    // https://dmitripavlutin.com/tag/hook/

    // =>
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (!bookmarkName || !bookmarkUrl) {
            event.preventDefault();
            return;
        }

        const newBookmark = { bookmarkName, bookmarkUrl, note, tags };
        await dispatch(createNewArticle(newBookmark, user.id, history));
    };

    return (
        <div className="create-new-article-component">
            <form
                onSubmit={handleSubmit}
                className="pure-form pure-form-stacked"
            >
                <div className="pure-control-group">
                    <label htmlFor="name">
                        <b>Bookmark name</b>
                    </label>
                    <input
                        type="text"
                        name="name"
                        size="30"
                        value={bookmarkName}
                        onChange={(e) => setBookmarkName(e.target.value)}
                    />
                    {submitted && !bookmarkName && (
                        <div className="invalid-feedback">
                            Bookmark name is required
                        </div>
                    )}
                </div>
                <br />

                <div className="pure-control-group">
                    <label htmlFor="name">
                        <b>Bookmark url</b>
                    </label>
                    <input
                        type="text"
                        name="name"
                        size="30"
                        onChange={(e) => setBookmarkUrl(e.target.value)}
                        value={bookmarkUrl}
                    />
                    {submitted && !bookmarkUrl && (
                        <div className="invalid-feedback">
                            Bookmark url is required
                        </div>
                    )}
                </div>
                <br />

                <div className="pure-control-group">
                    <label htmlFor="note">
                        <b>Add Bookmark Note</b>
                    </label>
                    <input
                        type="text"
                        name="note"
                        size="30"
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                    />
                    {submitted && !note && (
                        <div className="invalid-feedback">Note is required</div>
                    )}
                </div>
                <br />

                <div className="pure-control-group">
                    <input type="hidden" id="tags" name="tags" value={tags} />
                    <input
                        type="hidden"
                        id="userId"
                        name="userId"
                        value={tags}
                    />
                    <label htmlFor="tagsetter">
                        <b>Add Bookmark Tags</b>
                    </label>
                    <CreatableSelect
                        id="tagsetter"
                        className="select"
                        isMulti
                        onChange={handleTagChange}
                        options={tagOptions}
                    />
                </div>
                <br />
                {errObj ? (
                    <label className="login-error-label">
                        {errObj.error && errObj.error.response && (
                            <div> {errObj.error.response.data} </div>
                        )}
                        <br />
                    </label>
                ) : (
                    ""
                )}

                <div className="pure-control-group">
                    <input
                        type="submit"
                        value="Submit Bookmark"
                        className="button-secondary pure-button"
                    />
                    <Link to="/home">
                        <button className="button-secondary pure-button">
                            cancel
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CreateArticle;
