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
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getArticles(user.id));
  }, [dispatch]);

  const articlesFields = articles.map((article) => {
    let fields = {};
    fields.name = article.name;
    fields.url = article.article.url;
    const tags = (fields.tags = article.taggings.map((tagging) => {
      return tagging.tag.name;
    }));
    const tagsString = tags.join(', ');
    fields.tags = tagsString;
    fields.note = article.note;
    console.log(fields);
    return fields;
  });

  var FilterParams = {
    columnDefs: [
      {
        field: 'tags',
        filter: 'agTextColumnFilter',
        filterParams: {
          textCustomComparator: (filter, value, filterText) => {
            const filterTextLowerCase = filterText.toLowerCase();
            const valueLowerCase = value.toString().toLowerCase();
            switch (filter) {
              case 'contains':
                return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
              case 'notContains':
                return valueLowerCase.indexOf(filterTextLowerCase) === -1;
              case 'equals':
                return valueLowerCase === filterTextLowerCase;
              case 'notEqual':
                return valueLowerCase != filterTextLowerCase;
              case 'startsWith':
                return valueLowerCase.indexOf(filterTextLowerCase) === 0;
              case 'endsWith':
                var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
                return (
                  index >= 0 &&
                  index === valueLowerCase.length - filterTextLowerCase.length
                );
              default:
                // should never happen
                console.warn('invalid filter type ' + filter);
                return false;
            }
          },
        },
      },
    ],

    // other grid options ...
  };

  var gridOptions = {
    defaultColDef: {
      flex: 1,
      sortable: true,
      filter: true,
    },
    columnDefs: columnDefs,
    rowData: null,
  };

  console.log(articlesFields);

  return (
    <div>
      <Topbar />
      <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
        <AgGridReact rowData={articlesFields}>
          <AgGridColumn field="name"></AgGridColumn>
          <AgGridColumn field="url"></AgGridColumn>
          <AgGridColumn field="tags"></AgGridColumn>
          <AgGridColumn field="note"></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
}
