import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserArticles } from "../store/userArticles";
import { SingleArticle } from "./SingleArticle";
import { useHistory } from "react-router-dom";
import Topbar from "./Navigation/Topbar";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { _setFilteredArticlesToStore } from "../store/sharing";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export function UserArticlesTab() {
    const articles = useSelector((state) => state.userArticles);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getUserArticles(user.id));
    }, [dispatch]);

    function clickHandlerShare() {
        const arrToShare = grid.current.api.rowModel.rowsToDisplay.map(
            (node) => node.data.id
        );
        dispatch(_setFilteredArticlesToStore(arrToShare));
        history.push("/share/message");
    }

    function clickHandlerGridView() {
        history.push("/home");
    }

    const articlesFields = articles.map((article) => {
        let fields = {};
        fields.id = article.id;
        fields.name = article.name;
        fields.url = article.article.url;
        const tags = article.taggings.map((tagging) => {
            return tagging.tag.name;
        });
        // const tagsString = tags.join(', ');
        fields.tags = tags;
        fields.note = article.note;
        console.log(fields);
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
                "  </div>" +
                "</div>"
        }
    };

    const grid = useRef(null);

    return (
        <div>
            <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 1000 }}
            >
                <AgGridReact
                    ref={grid}
                    rowData={articlesFields}
                    defaultColDef={defaultColDef}
                >
                    <AgGridColumn field="name"></AgGridColumn>
                    <AgGridColumn field="url"></AgGridColumn>
                    <AgGridColumn field="tags"></AgGridColumn>
                    <AgGridColumn field="note"></AgGridColumn>
                </AgGridReact>
            </div>
            <button onClick={(e) => clickHandlerGridView()} id="tabViewButton">
                Show me grid view
            </button>
            <button onClick={(e) => clickHandlerShare()} id="shareButton">
                Share list with my friends!
            </button>
        </div>
    );
}
