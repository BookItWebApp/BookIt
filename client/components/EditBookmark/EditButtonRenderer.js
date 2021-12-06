import React, { useState } from 'react';
import { EditBookmark } from './EditBookmark';

export function EditButtonRenderer(params) {

  const [editMode, setEditMode] = useState(false);
  const [editObj, setEditObj] = useState({})

  return <div>{(editMode) ? <div><EditBookmark /></div> : <button onClick={() => setEditMode(true)}>Edit</button>}</div>

  // return <button>Edit</button>;

  //   const refresh = (param) => {
  //     return true;
  //   };

  //   const onClick = ($event) => {
  //     if (params.onClick instanceof Function) {
  //       const retParams = {
  //         event: $event,
  //         rowData: params.node.data,
  //       };
  //       params.onClick(retParams);
  //     }
  //     //   };
  //     return (
  //       <button className="button btn-primary" onClick={onClick}>
  //         Edit
  //       </button>
  //     );
  //   };
}
