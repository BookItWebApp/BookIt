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
          <div className="page-wrapper font-poppins">
            <div className="wrapper wrapper--w680">
              <div className="card card-4">
                <div className="card-body">
                  <h2 className="title">Do you want to delete bookmark?</h2>
                  <div style={{ margin: '0' }} className="row-modal row-space">
                    <div className="col-2-modal">
                      <div className="input-modal-group">
                        <label className="label-modal">Bookmark URL:</label>
                        <a href={url}>
                          {' '}
                          {url.length > 70
                            ? url.slice(0, 70) + '...'
                            : url}{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ marginTop: '10px' }}
                    className="row-modal row-space"
                  >
                    <div className="col-2-modal">
                      <div className="input-modal-group">
                        <label className="label-modal">Bookmark name:</label>
                        <p>{bookmarkName}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="table-btn-container"
                    style={{ marginTop: '25px' }}
                  >
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setModal(false);
                      }}
                      id="cancel"
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={submitDel}>
                      Yes, delete
                    </button>
                  </div>
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
          Delete
        </button>
      )}
    </div>
  );
}
