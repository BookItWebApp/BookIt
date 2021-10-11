// Constants
const SET_TAB = "SET_TAB"
// Actions
const setTab = (tab) => {
  return {
    type: SET_TAB,
    tab
  }
}
// Thunks
// Reducer
export default(state = {}, action) => {
  switch (action.type) {
    case SET_TAB:
      return action.tab
    default:
      return state;
  }
}