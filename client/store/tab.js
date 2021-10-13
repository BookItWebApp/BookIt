// Constants
const SET_TAB = 'SET_TAB';
// Actions
const setTab = (tab) => {
  return {
    type: SET_TAB,
    tab,
  };
};
// Thunks
export const fetchTab = () => {
  return async (dispatch) => {
    /*
      Tab item model:
      {
        active: boolean
        audible; boolean
        autoDiscardable: boolean
        discarded: boolean
        favIconUrl: string
        groupId: int
        height: int
        highlighted: boolean
        id: int
        incognito: boolean
        index: int
        mutedInfo: {
          muted: boolean
        }
        pinned: boolean
        selected: boolean
        status: string(?)
        title: string
        url: string
        width: int
        windowId: int
      }
    */
    try {
      let queryOptions = { active: true, currentWindow: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      dispatch(setTab(tab));
    } catch (error) {
      console.log(error);
    }
  };
};
// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_TAB:
      return action.tab;
    default:
      return state;
  }
};
