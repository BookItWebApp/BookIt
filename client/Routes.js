import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { me } from "./store";

import LoggedInRoutes from "./routes/LoggedInRoutes";
import LoggedOutRoutes from "./routes/LoggedOutRoutes";
import OpenRoutes from "./routes/OpenRoutes";
class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }

    render() {
        const { isLoggedIn, loaded } = this.props;
        // console.log("ROUTES IS_LOGGED_IN PROPS > ", isLoggedIn);

        return (
            <div className="routes-div--wrapper">
                {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
            </div>
        );
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
        // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
        isLoggedIn: !!state.auth.id,
        loaded: state.auth.loaded
    };
};

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me());
        }
    };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
