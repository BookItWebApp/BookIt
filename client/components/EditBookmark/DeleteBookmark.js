import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { deleteProduct } from '../../store/userArticles';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export function DeleteBookmark(props) {
  const [isModalOpen, setModal] = useState(false);
  const dispatch = useDispatch();
  const bookmark = props.data;
  const id = bookmark.id;
  const bookmarkName = bookmark.name;
  const url = bookmark.url;

  const submitDel = useCallback(
    async (event) => {
      event.preventDefault();
      console.log(123);
      const errCallback = () => toast('Something went wrong!');
      try {
        let result = await dispatch(deleteProduct(id, bookmark));

        if (result.status === 201 || result.status === 200) {
          toast('Bookmark deleted!');
        } else {
          errCallback();
        }
      } catch (err) {
        errCallback();
      }
    },
    [id, bookmark]
  );

  return (
    <div>
      {isModalOpen ? (
        ReactDOM.createPortal(
          <div className="modal_delete">
            <div>
              <b>Do you want to delete bookmark?</b>
              <p>{bookmarkName}</p>
              <p>{url}</p>
            </div>
            <button onClick={submitDel}>Delete</button>
            <button
              onClick={() => {
                setModal(false);
              }}
            >
              Cancel
            </button>
          </div>,
          document.querySelector('#modal')
        )
      ) : (
        <button
          onClick={() => {
            setModal(true);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}
