import axios from 'axios';

// Constants
const SET_AUTHOR = 'SET_AUTHOR';

// Actions
const setAuthor = (author) => ({
  type: SET_AUTHOR,
  author,
});

// Thunks
export const fetchAuthor = (authorId) => async (dispatch) => {
  try {
    const { data: author } = await axios.get(`/api/authors/${authorId}`);
    dispatch(setAuthor(author));
  } catch (error) {
    console.log(error);
  }
};

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_AUTHOR:
      return action.author;
    default:
      return state;
  }
};
