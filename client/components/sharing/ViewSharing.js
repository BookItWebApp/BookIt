import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSharing } from '../../store/sharing';
import { useHistory } from 'react-router-dom';
import { SingleSharing } from './SingleSharing';

export function ViewSharing() {
  const url = window.location.href;
  const sharingId = url.slice(-36);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSharing(sharingId));
  }, [dispatch]);

  const sharing = useSelector((state) => state.sharings.sharingDetails);
  console.log('sharing', sharing);

  if (!sharing || !sharing.sharingDetails) return null;

  return (
    <div>
      <h2>Hi! Here is the articles list your friend shared with you: </h2>
      <div>{sharing.userMessage}</div>
      <div>
        Articles
        {sharing.sharingDetails.map((article) => {
          return (
            <div key={article.id}>
              <div>
                <SingleSharing article={article} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
