import axios from 'axios';

//ACTION TYPES
const GET_ARTICLES = 'GET_ARTICLES';

//ACTION CREATORS
//Get all articles for a single user
const _getArticles = (articles) => {
  return {
    type: GET_ARTICLES,
    articles,
  };
};

//THUNKS
//get all articles 
export const getArticles = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/articles/`);
      dispatch(_getArticles(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * 
 * @param {string} articleId 
 * @returns a function that adds the logged-in author to the article with
 * the given id
 */
export const addAuthor = (articleId) => async (dispatch) => {
  try {
    await axios.put(`/api/articles/${articleId}`, null, {
      headers: { Authorization: window.localStorage.getItem('token') },
    });
    dispatch(getArticles());
  } catch (error) {
    console.log(error);
  }
};


//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function ArticlesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return action.articles;
    default:
      return state;
  }
}
