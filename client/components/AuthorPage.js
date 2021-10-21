import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAuthor } from '../store/singleAuthor';
import ArticleList from './ArticleList';

/**
 * @returns { JSX.Element } returns a React Component that displays an author
 * given the id in the url.
 *
 * Dispatches a thunk to `/api/author/:id` on changes to react store, or the id
 * given to the url (helps when changing authors within the page)
 *
 * React component comprises of a div containing basic author info (photo, name,
 * bio) and a {@link ArticleList list of articles} containing
 * {@link AuthorArticleItem information about that article}
 */
const AuthorPage = () => {
  const { id } = useParams();
  const author = useSelector((state) => state.singleAuthor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthor(id));
  }, [dispatch, id]);

  return (
    <div className="authorPage">
      <div className="aboutAuthor">
        <img src={author.photoUrl}></img>
        <div className="nameAndBio">
          <h1 className="authorName">{author.name}</h1>
          <p>{author.bio}</p>
        </div>
      </div>

      <div className="metadata"></div>

      {author.articles ? (
        <ArticleList articles={author.articles} />
      ) : (
        <React.Fragment />
      )}
    </div>
  );
};

export default AuthorPage;
