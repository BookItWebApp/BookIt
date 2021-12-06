import axios from "axios";

// => ACTION TYPES
const GET_USER_BOOKMARK = "GET_USER_BOOKMARK";
const CREATE_USER_BOOKMARK = "CREATE_USER_BOOKMARK";
const READ_USER_BOOKMARK = "READ_USER_BOOKMARK";
const DELETE_USER_BOOKMARK = "DELETE_USER_BOOKMARK";
const CREATE_USER_BOOKMARK_ERROR = "CREATE_USER_BOOKMARK_ERROR";

// => ACTION CREATORS
// Get all articles for a single user
const _getUserBookmarks = (articles) => {
    return {
        type: GET_USER_BOOKMARK,
        articles
    };
};

// CREATE AN ARTICLE
const _createUserBookmark = (article) => {
    return {
        type: CREATE_USER_BOOKMARK,
        article
    };
};

// AN ARTICLE ERROR
const _userBookmarkError = (error) => {
    return {
        type: CREATE_USER_BOOKMARK_ERROR,
        error
    };
};

// UPDATE THE ARTICLE(MARK AS READ)
const _readUserBookmark = (article) => {
    return {
        type: READ_USER_BOOKMARK,
        article
    };
};

// DELETE USER ARTICLE
const _deleteUserBookmark = (article) => {
    return {
        type: DELETE_USER_BOOKMARK,
        article
    };
};

// => THUNKS
//get all articles for a singlue user
export const getUserArticles = (id, token) => {
    return async (dispatch) => {
        try {
            // console.log("getUserArticles TOKEN: ", token);

            const response = await axios.get(`/api/userArticles/${id}`, {
                headers: {
                    authorization: token
                }
            });
            dispatch(_getUserBookmarks(response.data));
        } catch (error) {
            console.log(error);
        }
    };
};

// CREATE A SINGLE ARTICLE
export const createNewArticle = (article, userId, history, token) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(
                `/api/articles`,
                {
                    article: {
                        url: article.bookmarkUrl,
                        name: article.bookmarkName,
                        note: article.note,
                        tags: article.tags
                    },
                    userId
                },
                {
                    headers: {
                        authorization: token
                    }
                }
            );
            // console.log("THUNK DATA >", data);
            dispatch(_createUserBookmark(data));
            history.push("/home");
        } catch (err) {
            console.log("CATCH THUNK CREATE A NEW ARTICLE ERR:", err);
            return dispatch(_userBookmarkError({ error: err }));
        }
    };
};

// CREATE A SINGLE Extension ARTICLE
export const createNewExtensionArticle = (url, name, userId, tags) => {
    let article = { url: url, name: name, tags: [tags.split(",")] };
    return async (dispatch) => {
        try {
            const { data } = await axios.post(
                `"http://localhost:8080/api/articles`,
                {
                    article,
                    userId
                }
            ); // verify and store error details in createFormError redux peroperty
            dispatch(_createUserBookmark(data));
        } catch (err) {
            console.log("CREATE A NEW ARTICLE ERR:", err);
        }
    };
};

// get all user tags
export const getExtensionUserArticles = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/userArticles/${id}`
            );
            dispatch(_getUserBookmarks(data));
        } catch (error) {
            console.log(error);
        }
    };
};

// UPDATE A USER ARTICLE AS READ
export const markUserArticle = (userId, article) => {
    return async (dispatch) => {
        try {
            // console.log("UPDATE USER_ID > ", userId);
            // console.log("UPDATE ARTICLE > ", article);

            const { data } = await axios.put(`/api/userArticles/${userId}`, {
                article,
                userId
            });
            // console.log("THUNK UPDATE DATA > ", data);

            dispatch(_readUserBookmark(data));
            // history.push("/home");
        } catch (err) {
            console.log("UPDATE ATICLE ERR:", err);
        }
    };
};

// DELETE USER ARTICLE
export const deleteProduct = (articleId, article) => {
    return async (dispatch) => {
        try {
            // console.log("DELETED DATA USER_ID > ", articleId);
            // console.log("DELETED DATA ARTICLE > ", article);

            const { data } = await axios.delete(
                `/api/userArticles/${articleId}`,
                {
                    article
                }
            );
            // console.log("DELETED DATA > ", data);
            dispatch(_deleteUserBookmark(data));
            // history.push("/home");
        } catch (err) {
            console.log("DELETE PRODUCTS ERR:", err);
        }
    };
};

// =>Initial State
const initialState = [];

// => REDUCER
export default function userArticleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_BOOKMARK:
            let articles = action.articles.map((data) => {
                return { ...data, unread: data.readAt === null };
            });
            return articles;
        case CREATE_USER_BOOKMARK:
            return [...state, action.article];
        case READ_USER_BOOKMARK:
            return state.map((article) =>
                article.id === action.article.id ? action.article : article
            );
        case DELETE_USER_BOOKMARK:
            return state.filter((article) => article.id !== action.article.id);
        case CREATE_USER_BOOKMARK_ERROR:
            // console.log("REDUCER ERR STATE > ", state);
            // console.log("REDUCER ERR action.error > ", action.error);
            return [...state, action.error];
        default:
            return state;
    }
}
