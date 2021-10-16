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
    <div>
      <p>Would like to add a message?</p>
      <input
        id="messageInput"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={(e) => clickHandlerAdd(e)} id="addMessage">
        Add message
      </button>
      <button onClick={(e) => clickHandlerSkip(e)} id="skipMessage">
        Skip this step
      </button>
    </div>
  );
}
