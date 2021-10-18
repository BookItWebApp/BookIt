import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAuthor } from '../store/singleAuthor';
import ArticleList from './ArticleList';

export default () => {
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
