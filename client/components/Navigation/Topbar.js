import React from "react";
import { Link } from "react-router-dom";

const Topbar = ({ handleClick }) => {
    return (
        <div className="top-section--wrapper">
            <div className="bookmark--logo">
                <img
                    src="https://i.pinimg.com/564x/eb/ee/1b/ebee1bac4c625bfdda90cd60b03f97aa.jpg"
                    width="80px"
                    height="80px"
                    className="image-logo-top-section"
                />{" "}
                <span>ookIT</span>
            </div>
            <div className="top_navbar">
                <Link to="/home">
                    <h3 className="top-navbar-links pure-button">Home</h3>
                </Link>
                <Link to="/metrics">
                    <h3 className="top-navbar-links pure-button">
                        User metrics
                    </h3>
                </Link>
                <Link to="/create">
                    <h3 className="top-navbar-links pure-button">
                        Create bookmark
                    </h3>
                </Link>
                {/* <h3 className="top-navbar-links pure-button"> */}
                <a
                    href="#"
                    onClick={handleClick}
                    className="logo-btn-navbar--link top-navbar-links pure-button"
                >
                    Logout
                </a>
                {/* </h3> */}
            </div>
        </div>
    );
};

export default Topbar;
