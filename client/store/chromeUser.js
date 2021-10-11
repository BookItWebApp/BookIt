// Constants
const SET_USER = "SET_USER";
// Actions
const setUser = (user) => ({
  type: SET_USER,
  user,
});
// Thunks
export const fetchUser = () => async (dispatch) => {
  try {
    /* 
    Grabs user info and passes an object with the model of 
    {email: string, id: string}
    */
    await chrome.identity.getProfileUserInfo((userInfo) => {
      dispatch(setUser(userInfo));
    });
  } catch (error) {
    console.log(error);
  }
};
// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
