import axios from 'axios';
import history from '../history';


const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const cookie = await chrome.cookies.get({'url':'http://localhost/*',
 'name':'auth'})
  const token = cookie ?  cookie.value :  window.localStorage.getItem(TOKEN);
  console.log(token)
  if (token) {
    const res = cookie ? await axios.get("http://localhost:8080/auth/me", {
      headers: {
        authorization: token,
      },
    })
    :
    await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      document.cookie = `auth = ${res.data.token}`;
      document.cookie = "max-age=31536000"
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  }

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
