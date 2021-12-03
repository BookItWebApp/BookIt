import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Navbar = ({ handleClick, isLoggedIn }) => (
    <div className="nav-sidebar--wrapper">
        <nav>
            {isLoggedIn ? (
                <Topbar handleClick={handleClick} />
            ) : (
                <div className="login-signup-container">
                    {/* The navbar will show these links before you log in */}
                    <div className="login-signup-container--left pure-button">
                        <Link to="/login">
                            <span
                                className="login-signup--link"
                                className="login-signup--link"
                            >
                                LOGIN
                            </span>
                        </Link>
                    </div>
                    <div className="login-signup-container--right pure-button">
                        <Link to="/signup">
                            <span
                                className="login-signup--link"
                                className="login-signup--link"
                            >
                                SIGN-UP
                            </span>
                        </Link>
                    </div>
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
