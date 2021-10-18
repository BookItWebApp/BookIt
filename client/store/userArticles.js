import axios from 'axios';

//ACTION TYPES
const GET_USER_ARTICLES = 'GET_USER_ARTICLES';

//ACTION CREATORS
//Get all articles for a single user
const _getUserArticles = (articles) => {
  return {
    type: GET_USER_ARTICLES,
    articles,
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

//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function userArticleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ARTICLES:
      return action.articles;
    default:
      return state;
  }
}
