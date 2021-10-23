import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSharing } from '../../store/sharing';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { render } from 'react-dom';

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

  const myCellRenderer = (params) =>
    `<a href="${params.value}">${params.value}</a>`;

  const defaultColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    wrapText: true,
    autoHeight: true,
    floatingFilter: true,
    filter: true,
    cellRenderer: myCellRenderer,
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
            frameworkComponents={{
              hrefRenderer: myCellRenderer,
            }}
          >
            <AgGridColumn field="name" cellRenderer="null"></AgGridColumn>
            <AgGridColumn field="url"></AgGridColumn>
            <AgGridColumn field="note" cellRenderer="null"></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
}
