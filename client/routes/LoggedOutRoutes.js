import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import { LandingPage } from "../components/LandingPage";
import Login from "../components/LoginRegister/Login";
import Register from "../components/LoginRegister/Register";
import { ViewSharing } from "../components/sharing/ViewSharing";

class LoggedOutRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Register} />
                <Route path="/share/sharinglink" component={ViewSharing} />
                <Route path="/" component={LandingPage} />
            </Switch>
        );
    }
}

export default withRouter(LoggedOutRoutes);
