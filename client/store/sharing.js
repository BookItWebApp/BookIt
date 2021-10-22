import axios from 'axios';

//ACTION TYPES
const SET_SHARING = 'SET_SHARING';
const GET_SHARING = 'GET_SHARING';
const SET_MESSAGE = 'SET_MESSAGE';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const CLEAR_SHARINGID = 'CLEAR_SHARINGID';
const SET_ARTICLES = 'SET_ARTICLES';
const CLEAR_ARTICLES = 'CLEAR_ARTICLES';

//ACTION CREATORS
//Create sharing for a specific user
const _setSharing = (sharingId) => {
  return {
    type: SET_SHARING,
    sharingId,
  };
};

//Get details for specific sharing
const _getSharing = (sharingDetails) => {
  return {
    type: GET_SHARING,
    sharingDetails,
  };
};

//Adds sharing message to the store
export const _setMessage = (messageText) => {
  return {
    type: SET_MESSAGE,
    messageText,
  };
};

//Removes message from the store
export const _clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
    messageText: '',
  };
};

//Removes sharingId from the store
export const _clearSharingId = () => {
  return {
    type: CLEAR_SHARINGID,
    sharingId: '',
  };
};

export const _setFilteredArticlesToStore = (filteredArticles) => {
  return {
    type: SET_ARTICLES,
    filteredArticles,
  };
};

export const _clearFilteredArticlesStore = () => {
  return {
    type: SET_ARTICLES,
    filteredArticles: [],
  };
};

//THUNKS
//Create sharing for a specific user in db
export const setSharing = (userId, articles, userMessage) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/sharings/${userId}`, {
        userMessage,
        articles,
      });
      dispatch(_setSharing(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//Retrieve sharing details for a specific sharing id
export const getSharing = (sharingId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/sharings/${sharingId}`);
      dispatch(_getSharing(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//REDUCER
//Initial State
const initialState = {
  sharingId: '',
  sharingDetails: {},
  messageText: null,
  filteredArticles: [],
};

//Reducer
export default function sharingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHARING:
      return { ...state, sharingId: action.sharingId };
    case GET_SHARING:
      return { ...state, sharingDetails: action.sharingDetails };
    case SET_MESSAGE:
      return { ...state, messageText: action.messageText };
    case CLEAR_MESSAGE:
      return { ...state, messageText: action.messageText };
    case CLEAR_SHARINGID:
      return { ...state, sharingId: action.sharingId };
    case SET_ARTICLES:
      return { ...state, filteredArticles: action.filteredArticles };
    case CLEAR_ARTICLES:
      return { ...state, filteredArticles: action.filteredArticles };
    default:
      return state;
  }
}
