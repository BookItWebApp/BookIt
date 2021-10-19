import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSharing,
  _clearMessage,
  _clearSharingId,
  _clearFilteredArticlesStore,
} from '../../store/sharing';
import { useHistory } from 'react-router-dom';

export function SharingLink() {
  const sharingId = useSelector((state) => state.sharings.sharingId);
  const userId = useSelector((state) => state.auth.id);
  const articlesIdList = useSelector(
    (state) => state.sharings.filteredArticles
  );
  const userMessage = useSelector((state) => state.sharings.messageText);
  // const articlesIdList = articles.map((article) => {
  //   return article.id;
  // });
  const dispatch = useDispatch();
  const history = useHistory();

  function clickHandlerGenerateLink() {
    dispatch(setSharing(userId, articlesIdList, userMessage));
    dispatch(_clearMessage());
  }

  function copyToClipboard() {
    copyTextToClipboard(`http://localhost:8080/share/get/${sharingId}`);
    alert('Copied!');
  }

  function copyTextToClipboard(text) {
    var copyFrom = document.createElement('textarea');
    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
  }

  function clickHandlerHome() {
    dispatch(_clearSharingId());
    dispatch(_clearFilteredArticlesStore());
    history.push('/home');
  }

  return (
    <div>
      {!sharingId ? (
        <button onClick={() => clickHandlerGenerateLink()} id="generateLink">
          Generate Link
        </button>
      ) : (
        <div>
          <div>Here is the link you can share with your Friend!</div>
          <div id="generatedLink">
            http://localhost:8080/sharings/get/{sharingId}
          </div>
          <button onClick={() => copyToClipboard()} id="copyToClipboard">
            Copy Link to the Clipboard
          </button>
          <button onClick={() => clickHandlerHome()} id="backHome">
            Go back to the Homepage
          </button>
        </div>
      )}
    </div>
  );
}
