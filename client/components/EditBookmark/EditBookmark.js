import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { _setMessage } from '../../store/sharing';
import { useHistory } from 'react-router-dom';

export function EditBookmark(props) {

  const [url, setUrl] = useState(props.url);
  const [bookmarkName, setBookmarkName] = useState(props.bookmarkName);
  const [note, setNote] = useState(props.note);
  const [tags, setTags] = useState(props.tags);
  const [read, setRead] = useState(props.isRead);

    //performes actions after submit button is hit
    const submitChanges = useCallback(
      async (event) => {
        event.preventDefault();
        const errCallback = () => toast('Something went wrong!');

        //gets the token value from the browser cookies
        // let cookie = await chrome.cookies.get({
        // url: `${process.env.API_URL}*`,
        // name: 'auth',
        // });
        // const token = cookie.value;

        try {
          let result = await editBookmark(
            props.id,
            bookmarkName,
            note,
            tags,
            isRead
          );
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
      [tab, bookmarkName, note, tags]
    );

  return (
    <div className="ext-main-container">
      <form onSubmit={submitChanges}>
        <label htmlFor="url">
          <b>Bookmark URL</b>
        </label>
        <input type="url" type="text" name="url" size="30" value={tab.url} />
        <label htmlFor="name">
          <b>Bookmark Name</b>
        </label>
        <input
          type="ntext"
          type="text"
          name="name"
          size="30"
          onChange={(e) => setBookmarkName(e.target.value)}
          value={bookmarkName}
        />
        <label htmlFor="note">
          <b>Add Bookmark Note</b>
        </label>
        <input
          type="ntext"
          type="text"
          name="note"
          size="30"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
        <input type="hidden" id="tags" name="tags" value={tags} />
        <input type="hidden" id="userId" name="userId" value={user.id} />
        <label htmlFor="tagsetter">
          <b>Add Bookmark Tags</b>
        </label>
        <CreatableSelect
          id="tagsetter"
          className="select"
          isMulti
          onChange={handleChange}
          options={tagOptions}
        />
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


  // propsId
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const [message, setMessage] = useState('');

  // function clickHandlerAdd(e) {
  //   dispatch(_setMessage(message));
  //   history.push('/share/sharinglink');
  // }

  // function clickHandlerSkip(e) {
  //   history.push('/share/sharinglink');
  // }

  // return (
  //   <div className="main-add-msg-container">
  //     <div className="msg-header">
  //       <p>Would like to add a message?</p>
  //     </div>

  //     <div className="msg-input-container">
  //       <textarea
  //         align="center"
  //         rows="15"
  //         placeholder="Tell your friend something about the links you are sharing!"
  //         font="sans-serif"
  //         // cols="50"
  //         className="msg-input"
  //         onChange={(e) => setMessage(e.target.value)}
  //       ></textarea>
  //     </div>
  //     <div className="btns-container--main-add-msg-cntainer">
  //       <div className="msg-add-btn-container">
  //         <button
  //           className="msg-add-btn button-secondary pure-button"
  //           onClick={(e) => clickHandlerAdd(e)}
  //           id="addMessage"
  //         >
  //           Add message
  //         </button>
  //       </div>
  //       <div className="msg-skip-btn-container">
  //         <button
  //           className="msg-skip-btn button-secondary pure-button"
  //           onClick={(e) => clickHandlerSkip(e)}
  //           id="skipMessage"
  //         >
  //           Skip this step
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
