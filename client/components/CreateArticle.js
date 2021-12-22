import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import ReactSelect from "react-select";

import { getUserArticles, createNewArticle } from "../store/userArticles";

function CreateArticle() {
    const token = window.localStorage.getItem("token");
    const dispatch = useDispatch();
    const history = useHistory();

    const isLoggedIn = useSelector((state) => state.auth.id);
    const user = useSelector((state) => state.auth);
    const articles = useSelector((state) => state.userArticles);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        dispatch(getUserArticles(user.id, token));
    }, [dispatch]);

    function clickToHomePage() {
        history.push("/home");
    }

    // =>
    function handleTagChange(options) {
        let tagArray = [];
        console.log("handleTagChange = OPTIONS > ", options);

        for (let i = 0; i < options.length; i++) {
            tagArray.push(options[i].value);
        }
        console.log("handleTagChange = TAG_ARRAY > ", tagArray);
        setTags(tagArray);
    }

    let tagOptions = []; // CREATE TAG OPTION ARR TO HOLD UNIQUE TAGGINGS
    let errObj; // CREATE ERR_OBJ TO HOLD ERRS FROM BACK-END

    // => FUNC TO RETURN UNIQUE TAG OPTION, NO DUPLICATES
    const uniqueTaggingOptions = (articles) => {
        let tagsArr = [];
        // console.log("ARTICLES INPUT uniqueTaggingOptions > ", articles);

        articles.map((article) => {
            if (!article.taggings) {
                let customErr = articles.pop(); // REMOVE LAST ITEM FROM ARTICLES WHICH IS AN ERR RETURNED FROM BACK-END
                errObj = Object.assign(customErr);
            } else if (article.taggings) {
                return article.taggings.map((tag) =>
                    tagsArr.push({ value: tag.tag.name, label: tag.tag.name })
                );
            }
        });
        // console.log("ARTICLES.TAGS_ARR FROM uniqueTaggingOptions > ", tagsArr);

        let vals = tagsArr.map((obj) => obj.value); // RETURN ARR OF OBJ VALUES

        // RETUNS UNIQUE ARRAY OF TAGGS OBJ TO DISPLAY IN SELECT-DROPDOWN
        tagOptions = tagsArr.filter(
            ({ value }, index) => !vals.includes(value, index + 1)
        );
        // console.log("ERR.OBJ > ", errObj);
        return tagOptions;
    };

    uniqueTaggingOptions(articles);
    console.log(
        "uniqueTaggingOptions(articles) > ",
        uniqueTaggingOptions(articles)
    );

    // SETTING FORM VALIDATION RULES
    const validationSchema = Yup.object().shape({
        bookmarkName: Yup.string().required("Bookmark name is required"),
        bookmarkUrl: Yup.string()
            .required("Bookmark url is required")
            .url("Url is not valid")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // GET FUNCTIONS TO BUILD FORM WITH USEFORM() HOOK
    const { register, handleSubmit, setError, reset, control, formState } =
        useForm(formOptions);
    const { errors, isSubmitting } = formState;

    // SUBMIT FORM
    const onSubmit = async ({ bookmarkName, bookmarkUrl, note, tags }) => {
        try {
            console.log("ONSUBMIT_TAGS > ", tags);
            const newBookmark = { bookmarkName, bookmarkUrl, note, tags };

            await dispatch(
                createNewArticle(newBookmark, user.id, history, token)
            );
        } catch (error) {
            console.log("CATCH ON_SUBMIT CREATE_ARTILCE ERR > ", error);
            setError("inputError", { message: error });
        }
    };

    return (
        <div className="signup-login--container">
            {!isLoggedIn ? (
                <Redirect to="/login" />
            ) : (
                <div className="signup-login--form">
                    <div className="signup-login-header--form">
                        {/* <h2>Create bookmark</h2> */}
                        <p>Fill in this form to create a new bookmark!</p>
                        <hr></hr>
                    </div>

                    <div className="signup-login-body--form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group align-items-center">
                                <div className="form-group row">
                                    <label className="col-form-label">
                                        Bookmark name
                                    </label>
                                    <input
                                        name="bookmarkName"
                                        type="text"
                                        {...register("bookmarkName")} // REGISTER YOUR INPUT INTO THE HOOK BY INVOKING THE "REGISTER" FUNCTION
                                        className={`form-control ${
                                            errors.bookmarkName
                                                ? "is-invalid"
                                                : ""
                                        } `}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.bookmarkName?.message}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-form-label">
                                        Bookmark Url
                                    </label>
                                    <input
                                        name="bookmarkUrl"
                                        type="text"
                                        {...register("bookmarkUrl")}
                                        className={`form-control ${
                                            errors.bookmarkUrl
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.bookmarkUrl?.message}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-form-label">
                                        Bookmark Note
                                    </label>
                                    <input
                                        name="note"
                                        type="text"
                                        {...register("note")}
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group row">
                                    <label className="col-form-label">
                                        Add Bookmark Tags
                                    </label>
                                    {/* <input
                                        type="hidden"
                                        id="tags"
                                        name="tags"
                                        {...register("tags")}
                                    /> */}
                                    {/* <CreatableSelect
                                        id="tagsetter"
                                        className="select"
                                        isMulti
                                        onChange={handleTagChange}
                                        options={tagOptions}
                                    /> */}
                                    <Controller
                                        name="ReactSelect"
                                        control={control}
                                        render={({ field }) => (
                                            <ReactSelect
                                                id="tagsetter"
                                                isClearable
                                                {...field}
                                                isMulti
                                                onChange={handleTagChange}
                                                options={tagOptions}
                                            />
                                        )}
                                    />
                                </div>

                                <div className="form-group register--reset-btns">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting && (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        )}
                                        Submit Bookmark
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => reset()}
                                        className="btn btn-warning float-right"
                                    >
                                        Reset
                                    </button>
                                </div>
                                <div className="signup-login--account-exist">
                                    Do not want to create bookmark anymore?
                                    <button
                                        onClick={(e) => clickToHomePage()}
                                        className="login-click"
                                    >
                                        Go to home page
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default CreateArticle;

// function CreateArticle() {
//     const token = window.localStorage.getItem("token");

//     const history = useHistory();
//     const dispatch = useDispatch();

//     const user = useSelector((state) => state.auth);
//     const articles = useSelector((state) => state.userArticles);

//     const [submitted, setSubmitted] = useState(false);
//     const [bookmarkName, setBookmarkName] = useState("");
//     const [bookmarkUrl, setBookmarkUrl] = useState("");
//     const [note, setNote] = useState("");
//     const [tags, setTags] = useState([]);

//     useEffect(() => {
//         dispatch(getUserArticles(user.id, token));
//     }, [dispatch]);

//     // =>
//     function handleTagChange(options) {
//         let tagArray = [];
//         for (let i = 0; i < options.length; i++) {
//             tagArray.push(options[i].value);
//         }
//         setTags(tagArray);
//         console.log("SET_TAG_ARRAY > ", tagArray);
//     }

//     let tagOptions = []; // CREATE TAG OPTION ARR TO HOLD UNIQUE TAGGINGS
//     let errObj; // CREATE ERR_OBJ TO HOLD ERRS FROM BACK-END

//     // => FUNC TO RETURN UNIQUE TAG OPTION, NO DUPLICATES
//     const uniqueTaggingOptions = (articles) => {
//         let tagsArr = [];
//         articles.map((article) => {
//             if (!article.taggings) {
//                 let customErr = articles.pop(); // REMOVE LAST ITEM FROM ARTICLES WHICH IS AN ERR RETURNED FROM BACK-END

//                 errObj = Object.assign(customErr);
//             } else if (article.taggings) {
//                 return article.taggings.map((tag) =>
//                     tagsArr.push({ value: tag.tag.name, label: tag.tag.name })
//                 );
//             }
//         });
//         let vals = tagsArr.map((obj) => obj.value); // RETURN ARR OF OBJ VALUES
//         // RETUNS UNIQUE ARRAY OF TAGGS OBJ TO DISPLAY IN SELECT-DROPDOWN
//         tagOptions = tagsArr.filter(
//             ({ value }, index) => !vals.includes(value, index + 1)
//         );
//         console.log("TAG OPTION FROM uniqueTaggingOptions > ", tagOptions);
//     };
//     console.log(
//         "uniqueTaggingOptions(articles) > ",
//         uniqueTaggingOptions(articles)
//     );
//     uniqueTaggingOptions(articles);

//     // =>
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setSubmitted(true);

//         if (!bookmarkName || !bookmarkUrl) {
//             event.preventDefault();
//             return;
//         }

//         const newBookmark = { bookmarkName, bookmarkUrl, note, tags };
//         await dispatch(createNewArticle(newBookmark, user.id, history, token));
//     };

//     return (
//         <div className="create-new-article-component">
//             <form
//                 onSubmit={handleSubmit}
//                 className="pure-form pure-form-stacked"
//             >
//                 <div className="pure-control-group">
//                     <label htmlFor="name">
//                         <b>Bookmark name</b>
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         size="30"
//                         value={bookmarkName}
//                         onChange={(e) => setBookmarkName(e.target.value)}
//                     />
//                     {submitted && !bookmarkName && (
//                         <div className="invalid-feedback">
//                             Bookmark name is required
//                         </div>
//                     )}
//                 </div>
//                 <br />

//                 <div className="pure-control-group">
//                     <label htmlFor="name">
//                         <b>Bookmark url</b>
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         size="30"
//                         onChange={(e) => setBookmarkUrl(e.target.value)}
//                         value={bookmarkUrl}
//                     />
//                     {submitted && !bookmarkUrl && (
//                         <div className="invalid-feedback">
//                             Bookmark url is required
//                         </div>
//                     )}
//                 </div>
//                 <br />

//                 <div className="pure-control-group">
//                     <label htmlFor="note">
//                         <b>Add Bookmark Note</b>
//                     </label>
//                     <input
//                         type="text"
//                         name="note"
//                         size="30"
//                         onChange={(e) => setNote(e.target.value)}
//                         value={note}
//                     />
//                 </div>
//                 <br />

//                 <div className="pure-control-group">
//                     {/* <input type="hidden" id="tags" name="tags" value={tags} /> */}
//                     {/* <input
//                         type="hidden"
//                         id="userId"
//                         name="userId"
//                         value={tags}
//                     /> */}
//                     <label htmlFor="tagsetter">
//                         <b>Add Bookmark Tags</b>
//                     </label>
//                     <CreatableSelect
//                         id="tagsetter"
//                         className="select"
//                         isMulti
//                         onChange={handleTagChange}
//                         options={tagOptions}
//                     />
//                 </div>
//                 <br />
//                 {errObj ? (
//                     <label className="login-error-label">
//                         {errObj.error && errObj.error.response && (
//                             <div> {errObj.error.response.data} </div>
//                         )}
//                         <br />
//                     </label>
//                 ) : (
//                     ""
//                 )}

//                 <div className="pure-control-group">
//                     <input
//                         type="submit"
//                         value="Submit Bookmark"
//                         className="button-secondary pure-button"
//                     />
//                     <Link to="/home">
//                         <button className="button-secondary pure-button">
//                             cancel
//                         </button>
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default CreateArticle;
