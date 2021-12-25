import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updBookmark } from '../../store/userArticles';
import { ToastContainer, toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import ReactDOM from 'react-dom';

export function EditBookmark(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const bookmark = props.data;
  const bookmarks = useSelector((state) => state.userArticles);

  const [isModalOpen, setModal] = useState(false);
  const [id, setId] = useState(bookmark.id);
  const [url, setUrl] = useState(bookmark.url);
  const [bookmarkName, setBookmarkName] = useState(bookmark.name);
  const [note, setNote] = useState(bookmark.note);
  const [tags, setTags] = useState(bookmark.tags);
  const [read, setRead] = useState(bookmark.read);

  //creates list of unique tags for the dropdown menu
  const tagOptionsArrDupl = [];
  bookmarks.map((bookmark) =>
    bookmark.taggings.map((tag) => tagOptionsArrDupl.push(tag.tag.name))
  );

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  let tagOptionsArrUnique = tagOptionsArrDupl.filter(onlyUnique);

  let tagOptions = [];
  tagOptionsArrUnique.map((tag) => tagOptions.push({ value: tag, label: tag }));

  //creates list of default tag values for the input
  let tagValues = [];
  tags.map((tag) => tagValues.push({ value: tag, label: tag }));

  //tracks current tags list in local state (tags added or removed by user)
  function handleChange(options) {
    let tagArray = [];
    for (let i = 0; i < options.length; i++) {
      tagArray.push(options[i].value);
    }
    setTags(tagArray);
  }

  //performes actions after submit button is hit
  const submitChanges = useCallback(
    async (event) => {
      event.preventDefault();
      const errCallback = () => toast('Something went wrong!');
      try {
        //compiling tags updated data
        let addedTags = [];
        tags.map((tag) =>
          !bookmark.tags.includes(tag) ? addedTags.push(tag) : 0
        );

        let removedTags = [];
        bookmark.tags.map((tag) =>
          !tags.includes(tag) ? removedTags.push(tag) : 0
        );

        //defining read data
        let readAt = '';

        if (read === 'Yes' && bookmark.read === 'No') {
          readAt = new Date().toISOString();
        }

        if (read === 'No' && bookmark.read === 'Yes') {
          readAt = null;
        }

        let changedBookmark = {
          id,
          name: bookmarkName,
          note: note,
          readAt,
          addedTags,
          removedTags,
        };

        let result = await dispatch(updBookmark(changedBookmark));

        if (result.status === 201 || result.status === 200) {
          toast('Changes Saved!');
        } else {
          errCallback();
        }
      } catch (err) {
        errCallback();
      }
    },
    [id, bookmarkName, note, read, tags]
  );

  return (
    <div>
      {isModalOpen ? (
        ReactDOM.createPortal(
          <div className="page-wrapper font-poppins">
            <div className="wrapper wrapper--w680">
              <div className="card card-4">
                <div className="card-body">
                  <h2 className="title">Edit Bookmark</h2>
                  <form onSubmit={submitChanges}>
                    <div
                      style={{ margin: '0' }}
                      className="row-modal row-space"
                    >
                      <div className="col-2-modal">
                        <div className="input-modal-group">
                          <label className="label-modal">Bookmark URL:</label>
                          <a href={url}>
                            {' '}
                            {url.length > 50
                              ? url.slice(0, 50) + '...'
                              : url}{' '}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row-modal row-space "
                      style={{ margin: '0' }}
                    >
                      <div className="col-2-modal">
                        <div className="input-modal-group">
                          <label className="label-modal">Bookmark Name:</label>
                          <input
                            className="input-modal--style-4"
                            type="text"
                            name="name"
                            value={bookmarkName}
                            onChange={(e) => setBookmarkName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="row-modal row-space "
                      style={{ margin: '0' }}
                    >
                      <div className="col-2-modal">
                        <div className="input-modal-group">
                          <label className="label-modal">Note:</label>
                          <input
                            className="input-modal--style-4"
                            type="text"
                            name="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="row-modal row-space "
                      style={{ margin: '0' }}
                    >
                      <div className="col-2-modal">
                        <div className="input-modal-group">
                          <label className="label-modal">Read:</label>
                          <div className="p-t-10">
                            <label className="radio-container m-r-45">
                              Yes
                              <input
                                type="radio"
                                checked="checked"
                                name="gender"
                              />
                              {/* <span class="checkmark"></span> */}
                            </label>
                            <label className="radio-container">
                              No
                              <input type="radio" name="gender" />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <label htmlFor="url">
                      <b>Bookmark URL:</b>
                      <a href={url}>
                        {' '}
                        {url.length > 50 ? url.slice(0, 50) + '...' : url}{' '}
                      </a>
                    </label> */}
                    {/* <label htmlFor="name">
                      <b>Bookmark Name:</b>
                    </label>
                    <input
                      type="text"
                      name="name"
                      size="30"
                      value={bookmarkName}
                      onChange={(e) => setBookmarkName(e.target.value)}
                    /> */}
                    {/* <label htmlFor="note">
                      <b>Note:</b>
                    </label>
                    <input
                      type="ntext"
                      type="text"
                      name="note"
                      size="30"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    /> */}
                    <input type="hidden" id="tags" name="tags" value={tags} />
                    <input
                      type="hidden"
                      id="bookmarkId"
                      name="bookmarkId"
                      value={id}
                    />
                    <label htmlFor="read">
                      <b>Read: {read}</b>
                    </label>
                    <input
                      type="button"
                      name="note"
                      value={read === 'Yes' ? 'Mark as Unread' : 'Mark as Read'}
                      size="30"
                      onClick={(e) =>
                        read === 'Yes' ? setRead('No') : setRead('Yes')
                      }
                    />
                    <label htmlFor="tagsetter">
                      <b>Bookmark Tags</b>
                    </label>
                    <div className="mySelect__value-container">
                      <CreatableSelect
                        id="tagsetter"
                        className="select"
                        isMulti
                        onChange={handleChange}
                        autosize={true}
                        defaultValue={tagValues}
                        options={tagOptions}
                      />
                    </div>
                    <div>
                      <input
                        type="submit"
                        value="Save Changes"
                        className="button"
                      />
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
                    <div></div>
                  </form>
                  <button
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>,

          document.querySelector('#modal')
        )
      ) : (
        <button
          className="btn btn-secondary"
          style={{ fontSize: '0.7rem' }}
          onClick={() => {
            setModal(true);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
