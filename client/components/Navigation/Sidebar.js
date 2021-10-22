import React, { useState } from "react";
import { Link } from "react-router-dom";
import TagFilter from "./TagFilter";

const Sidebar = ({ handleClick }) => {
    return (
        <div>
            <nav>
                <div>
                    <div className="sidebar-tags-selector-div">
                        <h1>Select Tags</h1>
                    </div>
                    <TagFilter />
                </div>
                <div className="log-out-btn-container">
                    <div className="log-out-btn button-error">
                        <a href="#" onClick={handleClick}>
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
