//ACTION TYPES
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

//ACTION CREATORS

export const _openModal = () => {
  return {
    type: OPEN_MODAL,
    modalDisplayed: true,
  };
};

export const _closeModal = () => {
  return {
    type: CLOSE_MODAL,
    modalDisplayed: false,
  };
};

//REDUCER
//Initial State
const initialState = { modalDisplayed: false };

//Reducer
export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalDisplayed: action.modalDisplayed };
    case CLOSE_MODAL:
      return { ...state, modalDisplayed: action.modalDisplayed };
    default:
      return state;
  }
}
