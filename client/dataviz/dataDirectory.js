import React, { useEffect } from 'react';
import { me } from '../store';
import { getArticles } from '../store/articles';
import { getUserArticles } from '../store/userArticles';
import Topbar from "../components/Navigation/Topbar";
import { UserMetrics } from './UserMetrics';
import { useSelector, useDispatch } from 'react-redux';
import { previewArticle } from '../store/SingleArticle';




export function dataDirectory () {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const userArticles = useSelector((state) => state.userArticles)

    useEffect(() => {
        dispatch(me())
        dispatch(getArticles())
        dispatch(getUserArticles(user.id))
    }, [dispatch]);


    return (
      <div>
        <UserMetrics/>
      </div>
    )
}
