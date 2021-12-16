import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserArticles } from '../store/userArticles';
import { useHistory } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { _setFilteredArticlesToStore } from '../store/sharing';
import { EditBookmark } from './EditBookmark/EditBookmark';
import { DeleteButtonRenderer } from './EditBookmark/DeleteButtonRenderer';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export function UserArticlesTab() {
  const articles = useSelector((state) => state.userArticles);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  //get all user's articles
  useEffect(() => {
    dispatch(getUserArticles(user.id));
  }, [dispatch]);

  //set filtered bookmarks list to store for sharing and navigate to 'add sharing message' step
  function clickHandlerShare() {
    const arrToShare = grid.current.api.rowModel.rowsToDisplay.map(
      (node) => node.data.id
    );
    dispatch(_setFilteredArticlesToStore(arrToShare));
    history.push('/share/message');
  }

  //navigate to homepage
  function clickHandlerGridView() {
    history.push('/home');
  }

  //consolidated source data for ag grid table view creation
  const articlesFields = articles.map((article) => {
    let fields = {};
    fields.id = article.id;
    fields.name = article.name;
    fields.url = article.article.url;
    const tags = article.taggings.map((tagging) => {
      return tagging.tag.name;
    });
    fields.tags = tags;
    fields.note = article.note;
    const ifRead = article.readAt ? 'Yes' : 'No';
    fields.read = ifRead;
    const isPrivate = article.isPrivate ? 'Yes' : 'No';
    fields.private = isPrivate;
    return fields;
  });

  //custom display format for url column so it's content displayed as hyperlinks
  function urlRenderer(params) {
    return (
      <a href={params.value}>
        {' '}
        {params.value.length > 100
          ? params.value.slice(0, 100) + '...'
          : params.value}{' '}
      </a>
    );
  }

  //default table column format settings
  const defaultColDef = {
    resizable: true,
    sortable: true,
    wrapText: true,
    autoHeight: true,
    floatingFilter: true,
    filter: true,
    cellRenderer: null,
  };

  const grid = useRef(null);

  return (
    <div>
      <div className="table-header">
        <p>
          {user.username[0].toUpperCase() + user.username.slice(1)}
          's Bookmarks:
        </p>
      </div>
      <div className="table-container">
        <div className="ag-theme-alpine">
          <AgGridReact
            ref={grid}
            rowData={articlesFields}
            defaultColDef={defaultColDef}
            style={{ width: '100%', height: '100%;' }}
            domLayout="autoHeight"
            animateRows={true}
            frameworkComponents={{
              hrefRenderer: urlRenderer,
              editButtonRenderer: EditBookmark,
              deleteButtonRenderer: DeleteButtonRenderer,
            }}
          >
            <AgGridColumn field="name" flex="3"></AgGridColumn>
            <AgGridColumn
              field="url"
              cellRenderer="hrefRenderer"
              flex="3"
            ></AgGridColumn>
            <AgGridColumn field="tags" flex="2"></AgGridColumn>
            <AgGridColumn field="note" flex="2"></AgGridColumn>
            <AgGridColumn field="read" flex="1"></AgGridColumn>
            <AgGridColumn
              field="edit"
              cellRenderer="editButtonRenderer"
              cellRendererParams="rowData"
              flex="1"
            ></AgGridColumn>
            <AgGridColumn
              field="delete"
              cellRenderer="deleteButtonRenderer"
              cellRendererParams="rowData"
              flex="1"
            ></AgGridColumn>
          </AgGridReact>
        </div>
      </div>
      <div className="table-btn-container">
        <button
          className="table-btn pure-button"
          onClick={(e) => clickHandlerGridView()}
          id="tabViewButton"
        >
          Show me Grid view
        </button>
        <button
          className="table-btn pure-button"
          onClick={(e) => clickHandlerShare()}
          id="shareButton"
        >
          Share list with my friends!
        </button>
      </div>
    </div>
  );
}
