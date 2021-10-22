import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <div className="top-section--wrapper">
            <div className="top_navbar">
                <Link to="/home">
                    <h1 className="app-name--header">BookIt</h1>
                </Link>
                <Link to="/metrics">
                    <h3 className="top-navbar-links">User metrics</h3>
                </Link>
                <Link to="/create">
                    <h3 className="top-navbar-links">Create bookmark</h3>
                </Link>
            </div>
        </div>
    );
};

export default Topbar;
