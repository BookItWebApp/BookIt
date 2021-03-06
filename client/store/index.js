import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import tab from './tab';
import userArticlesReducer from './userArticles';
import tagsReducer from './tag';
import sharingsReducer from './sharing';
import ArticlePreview from './SingleArticle';
import ArticlesReducer from './articles';
import usersReducer from './users';
import modalReducer from './modals';

const reducer = combineReducers({
  auth,
  tab,
  userArticles: userArticlesReducer,
  tags: tagsReducer,
  sharings: sharingsReducer,
  metaData: ArticlePreview,
  allArticles: ArticlesReducer,
  usersReducer,
  modalReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
