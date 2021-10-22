import axios from "axios";

//ACTION TYPES
const GET_USER_ARTICLES = "GET_USER_ARTICLES";
const CREATE_USER_ARTICLE = "CREATE_USER_ARTICLE";
const READ_USER_ARTICLE = "READ_USER_ARTICLE";

//ACTION CREATORS
//Get all articles for a single user
const _getUserArticles = (articles) => {
    return {
        type: GET_USER_ARTICLES,
        articles
    };
};

// CREATE AN ARTICLE
const _createUserArticle = (article) => {
    return {
        type: CREATE_USER_ARTICLE,
        article
    };
};

// UPDATE THE ARTICLE
const _readUserArticle = (article) => {
    return {
        type: READ_USER_ARTICLE,
        article
    };
};

//THUNKS
//get all articles for a singlue user
export const getUserArticles = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/userArticles/${id}`);
            dispatch(_getUserArticles(response.data));
        } catch (error) {
            console.log(error);
        }
    };
};

// CREATE A SINGLE ARTICLE
export const createNewArticle = (article, userId, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`/api/articles`, {
                article,
                userId
            });
            dispatch(_createUserArticle(data));
            history.push("/home");
        } catch (err) {
            console.log("CREATE A NEW ARTICLE ERR:", err);
        }
    };
};

// UPDATE A USER ARTICLE AS READ
export const markUserArticle = (userId, article) => {
    return async (dispatch) => {
        try {
            console.log("UPDATE USER_ID > ", userId);
            console.log("UPDATE ARTICLE > ", article);

            const { data } = await axios.put(`/api/userArticles/${userId}`, {
                article,
                userId
            });
            console.log("THUNK UPDATE DATA > ", data);

            dispatch(_readUserArticle(data));
            // history.push("/home");
        } catch (err) {
            console.log("UPDATE ATICLE ERR:", err);
        }
    };
};

/**
 * 
 * @param {string} articleId 
 * @returns a function that adds the logged-in author to the article with
 * the given id
 */
export const addAuthor = (articleId, userId) => async (dispatch) => {
  try {
    await axios.put(`/api/articles/${articleId}`, null, {
      headers: { Authorization: window.localStorage.getItem('token') },
    });
    dispatch(getUserArticles(userId));
  } catch (error) {
    console.log(error);
  }
};

//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function userArticleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_ARTICLES:
            return action.articles;
        case CREATE_USER_ARTICLE:
            return [...state, action.article];
        case READ_USER_ARTICLE:
            return state.map((article) =>
                article.id === action.article.id ? action.article : article
            );
        default:
            return state;
    }
}
