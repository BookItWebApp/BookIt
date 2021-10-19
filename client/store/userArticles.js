import axios from "axios";

//ACTION TYPES
const GET_USER_ARTICLES = 'GET_USER_ARTICLES';
const CREATE_ARTICLE = "CREATE_ARTICLE";
const UPDATE_ARTICLE = "UPDATE_ARTICLE";

//ACTION CREATORS
//Get all articles for a single user
const _getUserArticles = (articles) => {
  return {
    type: GET_USER_ARTICLES,
    articles,
  };
};

// CREATE AN ARTICLE
const _createArticle = (article) => {
    return {
        type: CREATE_ARTICLE,
        article
    };
};

// UPDATE THE ARTICLE
const _updateArticle = (article) => {
    return {
        type: UPDATE_ARTICLE,
        article
    };
}

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
            dispatch(_createArticle(data));
            history.push("/home");
        } catch (err) {
            console.log("CREATE A NEW ARTICLE ERR:", err);
        }
    };
};
// // UPDATE A SINGLE ARTICLE
// export const updateArticle =(articleId, updates, history)=>{
//   return async(dispatch)=>{
//     try{
//       const {data}=await axios.put(`/api/userArticles/${articleId}`, updates);
//       console.log("THUNK UPDATE DATA > ", data);

//       dispatch(_updateArticle(data));
//       history.push("/home")
//     }catch(err){
//       console.log("UPDATE ATICLE ERR:", err);
//     }
//   }
// }

//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function userArticleReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_ARTICLES:
            return action.articles;
        case CREATE_ARTICLE:
            return [...state, action.article];
        case UPDATE_ARTICLE:
            return state.map((article) =>
                article.id === action.article.id ? action.article : article
            );
        default:
            return state;
    }
}
