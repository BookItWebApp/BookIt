import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import { ViewSharing } from "../components/sharing/ViewSharing";

class UniversalRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/share/sharinglink" component={ViewSharing} />
                {/* TODO CREATE HOME/ABOUT PAGE */}
                {/* <Route path="/about" component={About} />
                <Route path="/home" component={Home} /> */}
            </Switch>
        );
    }
}

export default withRouter(UniversalRoutes);
