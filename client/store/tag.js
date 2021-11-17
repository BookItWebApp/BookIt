//REDUX STORE FOR TAGS

import axios from "axios";

// -------------------------------- ACTION TYPES
const GET_TAGS = "GET_TAGS";
const GET_USER_TAGS = "GET_USER_TAGS";
const SAVE_SELECTED_TAGS = "SAVE_SELECTED_TAGS";

// ------------------------------- ACTION CREATORS
// Get all tags
const _getTags = (tags) => {
    return {
        type: GET_TAGS,
        tags
    };
};
// GET USER TAGS
const _getUserTags = (tags) => {
    return {
        type: GET_USER_TAGS,
        tags: tags
    };
};

//--------------------------------------- THUNKS
//get all tags
export const getTags = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "http://localhost:8080/api/taggings/"
            );
            dispatch(_getTags(data));
        } catch (error) {
            console.log(error);
        }
    };
};

// Save selected tags
export const saveSelectedTags = (tags) => {
    return (dispatch) => {
        dispatch({
            type: SAVE_SELECTED_TAGS,
            tags: tags
        });
    };
};

// GET USER TAGS
export const getUserTags = (id) => {
    return async (dispatch) => {
        try {
            // console.log("THUNK USER_TAG ID: ", id);
            const { data } = await axios.get(`/api/tags/${id}`);
            // console.log("THUNK USER_TAGS DATA:", data);

            dispatch(_getUserTags(data));
        } catch (err) {
            console.log("THUNK GET USER_TAGS ERR:", err);
        }
    };
};

//Initial State
const initialState = { tags: [], filteredTags: [] };

//Reducer
export default function tagsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return action.tags;
        case GET_USER_TAGS:
            return { ...state, tags: action.tags };
        case SAVE_SELECTED_TAGS:
            return { ...state, filteredTags: [...action.tags] };
        default:
            return state;
    }
}
