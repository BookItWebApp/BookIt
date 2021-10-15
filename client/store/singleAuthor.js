// Constants
const SET_AUTHOR = 'SET_AUTHOR';
// Actions
const setAuthor = (author) => ({
  type: SET_AUTHOR,
  author,
});
// Thunks
// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTHOR:
      return action.author;
    default:
      return state;
  }
};
