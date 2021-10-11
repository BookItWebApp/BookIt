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
const fetchTab = () => {
  return (dispatch) => {
    try {
      let queryOptions = { active: true, currentWindow: true}
      let [tab] = await chrome.tabs.query(queryOptions)
      dispatch(setTab(tab))
    } catch (error) {
      console.log(error)
    }
  }
}
// Reducer
export default(state = {}, action) => {
  switch (action.type) {
    case SET_TAB:
      return action.tab
    default:
      return state;
  }
}