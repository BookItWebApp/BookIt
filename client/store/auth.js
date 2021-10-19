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
//AUTH Routes have been written to support both extension and webapp authorization
//"if(chrome.cookies)" is used to determine if we are accessing from extension
//instead of local storage App and extension now check cookies for login info
export const me = () => async (dispatch) => {
  //set cookie value for extension. It will be passed down to make several checks
  let cookie = '';
  if (chrome.cookies) {
    //extension checking for auth cookie
    cookie = await chrome.cookies.get({
      url: 'http://localhost/*',
      name: 'auth',
    });
  }
  //checking if we found a cookie above or not
  const token = cookie ? cookie.value : document.cookie.split('; ').find(row => row.startsWith('auth=')).split('=')[1]
  if (token) {
    //checking if cooking found above. If yes we are in extension get user auth info from full localhost api url
    const res = cookie
      ? await axios.get('http://localhost:8080/auth/me', {
          headers: {
            authorization: token,
          },
        })
        //if not we are in webapp. Get user auth info from local api route
      : await axios.get('/auth/me', {
          headers: {
            authorization: token,
          },
        });
        //set state with auth info
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      //check if we are in extension
      const res = chrome.cookies
        //yes we are in extension
        ? await axios.post(`http://localhost:8080/auth/${method}`, {
            username,
            password,
          })
          //no we are in webapp
        : await axios.post(`/auth/${method}`, { username, password });
      //check if we are in extension. If so submit cookies to localhost, logging us in
      if (chrome.cookies) {
         await chrome.cookies.set(
          {
            url: 'http://localhost/*',
            name: 'max-age',
            value: '31536000',
          },
          await chrome.cookies.set(
            {
              url: 'http://localhost/*',
              name: 'auth',
              value: res.data.token,
            })
        )
      } else {
        //if not in extension set cookies directly with document.cookie
        window.localStorage.setItem(TOKEN, res.data.token);
        document.cookie = `auth = ${res.data.token}`;
        document.cookie = 'max-age=31536000';
      }
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  //delete and expire cookies on logout
  document.cookie = 'auth=; path=/;';
  document.cookie = 'max-age=-99999999; path=/;';

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
