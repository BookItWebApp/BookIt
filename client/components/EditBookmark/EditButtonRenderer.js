import React, { useState } from 'react';
import Modal from '../Modal';

export function EditButtonRenderer(props) {
  const [editMode, setEditMode] = useState(false);
  const [editObj, setEditObj] = useState({});

  let actProps = { ...props, action: 'edit' };

  return (
    <div>
      {editMode ? (
        <div>
          <Modal bookmark={actProps} />
        </div>
      ) : (
        <button onClick={() => setEditMode(true)}>Edit</button>
      )}
    </div>
  );
}
