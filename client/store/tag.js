//REDUX STORE FOR TAGS

import axios from "axios";

//ACTION TYPES
const GET_TAGS = "GET_TAGS";

//ACTION CREATORS
//Get all tags
const _getTags = (tags) => {
  return {
    type: GET_TAGS,
    tags,
  };
};

//THUNKS
//get all tags
export const getTags = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get("http://localhost:8080/api/taggings/");
      dispatch(_getTags(data));
    } catch (error) {
      console.log(error);
    }
  };
};
//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS:
      return action.tags;
    default:
      return state;
  }
}
