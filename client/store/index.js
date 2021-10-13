import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import tab from './tab'
import userArticlesReducer from './userArticles'
import tagsReducer from './tag'

const reducer = combineReducers({
  auth,
  tab,
  userArticles: userArticlesReducer,
  tags: tagsReducer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
