import React, { useState } from 'react';
import Modal from '../Modal';

export function DeleteButtonRenderer(props) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [editObj, setEditObj] = useState({});

  let actProps = { ...props, action: 'delete' };

  return (
    <div>
      {deleteMode ? (
        <div>
          <Modal bookmark={actProps} />
        </div>
      ) : (
        <button onClick={() => setDeleteMode(true)}>Delete</button>
      )}
    </div>
  );
}
