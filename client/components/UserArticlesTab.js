import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserArticles } from "../store/userArticles";
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
        fields.tags = tags;
        fields.note = article.note;
        const ifRead = article.readAt ? "Yes" : "No";
        fields.read = ifRead;
        const isPrivate = article.isPrivate ? "Yes" : "No";
        fields.private = isPrivate;
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
        cellRenderer: myCellRenderer
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
                        style={{ width: "100%", height: "100%;" }}
                        domLayout="autoHeight"
                        animateRows={true}
                        frameworkComponents={{
                            hrefRenderer: myCellRenderer
                        }}
                    >
                        <AgGridColumn
                            field="name"
                            cellRenderer="null"
                        ></AgGridColumn>
                        <AgGridColumn field="url"></AgGridColumn>
                        <AgGridColumn
                            field="tags"
                            cellRenderer="null"
                        ></AgGridColumn>
                        <AgGridColumn
                            field="read"
                            cellRenderer="null"
                        ></AgGridColumn>
                        <AgGridColumn
                            field="private"
                            cellRenderer="null"
                        ></AgGridColumn>
                        <AgGridColumn
                            field="note"
                            cellRenderer="null"
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
