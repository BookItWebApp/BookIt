import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { _setMessage } from '../../store/sharing';
import { useHistory } from 'react-router-dom';

export function AddMessage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  function clickHandlerAdd(e) {
    dispatch(_setMessage(message));
    history.push('/share/sharinglink');
  }

  function clickHandlerSkip(e) {
    history.push('/share/sharinglink');
  }

  return (
    <div className="main-add-msg-container">
      <div className="msg-header">
        <p>Would like to add a message?</p>
      </div>

      <div className="msg-input-container">
        <textarea
          align="center"
          rows="15"
          placeholder="Tell your friend something about the links you are sharing!"
          font="sans-serif"
          // cols="50"
          className="msg-input"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className="btns-container--main-add-msg-cntainer">
        <div className="msg-add-btn-container">
          <button
            className="msg-add-btn button-secondary pure-button"
            onClick={(e) => clickHandlerAdd(e)}
            id="addMessage"
          >
            Add message
          </button>
        </div>
        <div className="msg-skip-btn-container">
          <button
            className="msg-skip-btn button-secondary pure-button"
            onClick={(e) => clickHandlerSkip(e)}
            id="skipMessage"
          >
            Skip this step
          </button>
        </div>
      </div>
    </div>
  );
}
