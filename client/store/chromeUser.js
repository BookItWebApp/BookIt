// Constants
const SET_USER = "SET_USER";
// Actions
const setUser = (user) => ({
  type: SET_USER,
  user,
});
// Thunks
// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
