import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import FormFilters from "./FormFilters";
import TagFilter from "./TagFilter";

const MainMenu = ({ handleClick }) => {
    return (
        <div>
            <nav>
                <Header />
                <div>
                    <h1>Select Tags</h1>
                    <TagFilter />
                </div>
                <div>
                    <a href="#" onClick={handleClick}>
                        Logout
                    </a>
                </div>
            </nav>
        </div>
    );
};

export default MainMenu;
