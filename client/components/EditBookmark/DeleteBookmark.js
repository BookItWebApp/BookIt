import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _setMessage } from '../../store/sharing';
import { useHistory } from 'react-router-dom';
import { updBookmark } from '../../store/userArticles';
import { ToastContainer, toast } from 'react-toastify';

export function DeleteBookmark(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const bookmark = props.bookmark.data;

  const [id, setId] = useState(bookmark.id);
  const [url, setUrl] = useState(bookmark.url);
  const [bookmarkName, setBookmarkName] = useState(bookmark.name);
  const [note, setNote] = useState(bookmark.note);
  const [tags, setTags] = useState(bookmark.tags);
  const [read, setRead] = useState(bookmark.read);

  //performes actions after submit button is hit
  const submitChanges = useCallback(
    async (event) => {
      event.preventDefault();
      const errCallback = () => toast('Something went wrong!');
      try {
        let changedBookmark = {
          id: bookmark.data.id,
          name: bookmarkName,
          note: note,
          readAt: read,
          tags: tags,
        };
        let result = await updBookmark(changedBookmark, user.id);
        if (result.status === 201 || result.status === 200) {
          toast('Changes Saved!', {
            onClose: () => {
              window.close();
            },
          });
        } else {
          errCallback();
        }
      } catch (err) {
        errCallback();
      }
    },
    [bookmarkName, note, read, tags]
  );

  return (
    <div className="modal_delete">
      <div>
        <b>Do you want to delete bookmark?</b>
        <p>{bookmarkName}</p>
        <p>{url}</p>
      </div>
      <button>Delete</button>
      <button>Cancel</button>
    </div>
  );
}
