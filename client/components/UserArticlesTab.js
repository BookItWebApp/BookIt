import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../store/userArticles';
import { SingleArticle } from './SingleArticle';
import { useHistory } from 'react-router-dom';
import Topbar from './Navigation/Topbar';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function UserArticlesTab() {
  const articles = useSelector((state) => state.userArticles);

  //   const dispatch = useDispatch();
  //   const history = useHistory();

  return (
    <div>
      <Topbar />
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={articles}>
          <AgGridColumn field="name"></AgGridColumn>
          <AgGridColumn field="note"></AgGridColumn>
          <AgGridColumn field="userId"></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
}
