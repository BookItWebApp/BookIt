import React from 'react';
import ReactDOM from 'react-dom';
import { EditBookmark } from './EditBookmark/EditBookmark';
import { DeleteBookmark } from './EditBookmark/DeleteBookmark';

function Modal(props) {
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
