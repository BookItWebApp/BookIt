import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _setMessage } from '../../store/sharing';
import { useHistory } from 'react-router-dom';
import { updBookmark } from '../../store/userArticles';
import { ToastContainer, toast } from 'react-toastify';

export function EditBookmark(props) {
  console.log('editcomponent props', props);
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
    <div className="modal">
      <form onSubmit={submitChanges}>
        <label htmlFor="url">
          <b>Bookmark URL:</b>
          <p>{url}</p>
        </label>
        <label htmlFor="name">
          <b>Bookmark Name</b>
        </label>
        <input
          type="ntext"
          type="text"
          name="name"
          size="30"
          value={bookmarkName}
          onChange={(e) => setBookmarkName(e.target.value)}
        />
        <label htmlFor="note">
          <b>Note</b>
        </label>
        <input
          type="ntext"
          type="text"
          name="note"
          size="30"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <input type="hidden" id="tags" name="tags" value={tags} />
        <input type="hidden" id="bookmarkId" name="bookmarkId" value={id} />
        {/* <label htmlFor="tagsetter">
          <b>Bookmark Tags</b>
        </label>
        <CreatableSelect
          id="tagsetter"
          className="select"
          isMulti
          onChange={handleChange}
          options={tagOptions}
        /> */}
        <div>
          <input type="submit" value="Submit Bookmark" className="button" />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
        <div>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  );
}
