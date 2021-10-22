import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Sidebar from "./Navigation/Sidebar";
import Topbar from "./Navigation/Topbar";

const Navbar = ({ handleClick, isLoggedIn }) => (
    <div className="nav-sidebar--wrapper">
        <nav>
            {isLoggedIn ? (
                // <Sidebar handleClick={handleClick}/>
                <Topbar />
            ) : (
                <div>
                    {/* The navbar will show these links before you log in */}
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </nav>
    </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        isLoggedIn: !!state.auth.id
    };
};

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout());
        }
    };
};

export default connect(mapState, mapDispatch)(Navbar);
