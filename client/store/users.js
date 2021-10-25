import axios from "axios";

//Action Constants
const CREATE_USER = "CREATE_USER";

//Action Creators
const createUser = (user) => ({
    type: CREATE_USER,
    user
});

//Thunks
//send new user to api/users/
export const createNewUser = (user, history) => {
    return async (dispatch) => {
        const { data } = await axios.post("/api/users", user);
        dispatch(createUser(data));
        history.push("/login");
    };
};

const initialState = [];

//Reducer
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return [...state, action.user];
        default:
            return state;
    }
};

export default usersReducer;
