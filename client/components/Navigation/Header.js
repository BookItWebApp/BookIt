import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="navbar-header">
            <div className="brand-name-wrapper">
                <Link to="/home">
                    <h1 className="app-name--header">BookIt</h1>
                </Link>
            </div>
        </div>
    );
};

export default Header;
