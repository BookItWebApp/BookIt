import React from 'react';
import ReactDOM from 'react-dom';
import { EditBookmark } from './EditBookmark/EditBookmark';
import { DeleteBookmark } from './EditBookmark/DeleteBookmark';

function Modal(props) {
  console.log('modal props', props);
  console.log('action', props.bookmark.action);

  return ReactDOM.createPortal(
    props.bookmark.action === 'edit' ? (
      <EditBookmark bookmark={props.bookmark} />
    ) : (
      <DeleteBookmark bookmark={props.bookmark} />
    ),
    document.querySelector('#modal')
  );
}

export default Modal;
