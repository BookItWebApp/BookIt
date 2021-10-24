import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSharing,
  _clearMessage,
  _clearSharingId,
  _clearFilteredArticlesStore,
} from '../../store/sharing';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SharingLink() {
  const sharingId = useSelector((state) => state.sharings.sharingId);
  const userId = useSelector((state) => state.auth.id);
  const articlesIdList = useSelector(
    (state) => state.sharings.filteredArticles
  );
  const userMessage = useSelector((state) => state.sharings.messageText);
  const dispatch = useDispatch();
  const history = useHistory();
  const url = window.location.href;

  function clickHandlerGenerateLink() {
    dispatch(setSharing(userId, articlesIdList, userMessage));
    dispatch(_clearMessage());
  }

  function copyToClipboard() {
    copyTextToClipboard(`${url}/${sharingId}`);
    notify();
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

  const notify = () => toast('Copied!');

  function clickHandlerHome() {
    dispatch(_clearSharingId());
    dispatch(_clearFilteredArticlesStore());
    history.push('/home');
  }

  return (
    <div>
      {!sharingId ? (
        <div>
          <div className="msg-header">
            <p>Let's generate a Link you can share!</p>
          </div>
          <div className="link-generate-btn-container">
            <button
              className="link-generate-btn "
              onClick={() => clickHandlerGenerateLink()}
              id="generateLink"
            >
              Generate Link
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="msg-header">
            <p>Here is the link you can share with your friends!</p>
          </div>
          <div className="link-area" id="generatedLink">
            {url}/{sharingId}
          </div>
          <div className="msg-add-btn-container">
            <button
              className="msg-add-btn"
              onClick={() => copyToClipboard()}
              id="copyToClipboard"
            >
              Copy Link to the Clipboard
            </button>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
          <div className="msg-skip-btn-container">
            <button
              className="msg-skip-btn"
              onClick={() => clickHandlerHome()}
              id="backHome"
            >
              Go back to the Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
