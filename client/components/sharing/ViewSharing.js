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
    headerComponentParams: {
      template:
        '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        '  </div>' +
        '</div>',
    },
  };

  return (
    <div>
      <h2>Hi! Here is the articles list your friend shared with you: </h2>
      <div>{sharing.userMessage}</div>
      <div>
        Articles
        <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
          <AgGridReact rowData={articlesFields} defaultColDef={defaultColDef}>
            <AgGridColumn field="name"></AgGridColumn>
            <AgGridColumn field="url"></AgGridColumn>
            <AgGridColumn field="note"></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
}
