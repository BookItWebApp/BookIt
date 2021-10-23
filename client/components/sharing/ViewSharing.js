import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSharing } from '../../store/sharing';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function ViewSharing() {
  const url = window.location.href;
  const sharingId = url.slice(-36);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSharing(sharingId));
  }, [dispatch]);

  const sharing = useSelector((state) => state.sharings.sharingDetails);
  if (!sharing || !sharing.sharingDetails) return null;

  const articlesList = sharing.sharingDetails;

  const articlesFields = articlesList.map((article) => {
    let fields = {};
    fields.name = article.userArticle.name;
    fields.url = article.userArticle.article.url;
    fields.note = article.userArticle.note;
    return fields;
  });

  const defaultColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    wrapText: true,
    autoHeight: true,
    floatingFilter: true,
    filter: true,
  };

  return (
    <div>
      <div className="table-header">
        <p>Hi! Here is the articles list your friend shared with you: </p>
      </div>
      <div className="shared-msg-area">{sharing.userMessage}</div>
      <div className="table-container">
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={articlesFields}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            style={{ width: '100%', height: '100%' }}
            animateRows={true}
          >
            <AgGridColumn field="name"></AgGridColumn>
            <AgGridColumn field="url"></AgGridColumn>
            <AgGridColumn field="note"></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
}
