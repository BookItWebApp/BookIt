//ACTION TYPES
const OPEN_EDIT_MODAL = 'OPEN_EDIT_MODAL';
const CLOSE_EDIT_MODAL = 'CLOSE_EDIT_MODAL';
const OPEN_DELETE_MODAL = 'OPEN_DELETE_MODAL';
const CLOSE_DELETE_MODAL = 'CLOSE_DELETE_MODAL';

//ACTION CREATORS

export const _openEdit = () => {
  return {
    type: OPEN_EDIT_MODAL,
  };
};

export const _closeEdit = () => {
  return {
    type: CLOSE_EDIT_MODAL,
  };
};

export const _openDelete = () => {
  return {
    type: OPEN_DELETE_MODAL,
  };
};

export const _closeDelete = () => {
  return {
    type: CLOSE_DELETE_MODAL,
  };
};

//REDUCER
//Initial State
const initialState = { editModalDisplayed: false, deleteModalDisplayed: false };

//Reducer
export default function modalReducer(state = initialState) {
  switch (action.type) {
    case OPEN_EDIT_MODAL:
      return { ...state, editModalDisplayed: true };
    case CLOSE_EDIT_MODAL:
      return { ...state, editModalDisplayed: false };
    case OPEN_DELETE_MODAL:
      return { ...state, deleteModalDisplayed: true };
    case CLOSE_DELETE_MODAL:
      return { ...state, deleteModalDisplayed: false };
    default:
      return state;
  }
}
