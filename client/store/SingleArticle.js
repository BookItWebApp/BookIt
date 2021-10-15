//SINGLE ARTICLE REDUX STORE
import axios from "axios";

//ACTION TYPES
const PREVIEW_ARTICLE = "PREVIEW_ARTICLES";

//ACTION CREATORS
//Display preview for a single article
const _previewArticle = (article) => {
  return {
    type: PREVIEW_ARTICLE,
    article,
  };
};

//THUNKS
//get preview for single article
export const previewArticle = (articleUrl) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/article/preview", {
        params: { url: articleUrl },
      });
      dispatch(_previewArticle(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function ArticlePreview(state = initialState, action) {
  switch (action.type) {
    case PREVIEW_ARTICLE:
      return [...state, action.article];
    default:
      return state;
  }
}
