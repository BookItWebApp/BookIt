import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import TagFilter from "./TagFilter";

const MainMenu = ({ handleClick }) => {
    return (
        <div>
            <nav>
                <Header />
                <div>
                    <div className="sidebar-tags-selector-div">
                        <h1>Select Tags</h1>
                    </div>
                    <TagFilter />
                </div>
                <div className="log-out-btn-container">
                    <div className="log-out-btn">
                        <a href="#" onClick={handleClick}>
                            Logout
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default MainMenu;
