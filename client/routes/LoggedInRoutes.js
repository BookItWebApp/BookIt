import React, { Component } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

import CreateArticle from "../components/CreateArticle";
import { UserArticles } from "../components/UserArticles";
import { UserArticlesTab } from "../components/UserArticlesTab";
import { EditBookmark } from "../components/EditBookmark/EditBookmark";

import { AddMessage } from "../components/sharing/AddMessage";
import { SharingLink } from "../components/sharing/SharingLink";
import { ViewSharing } from "../components/sharing/ViewSharing";

import { dataDirectory } from "../dataviz/dataDirectory";

class LoggedInRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/home" component={UserArticles} />
                <Route exact path="/home/tab" component={UserArticlesTab} />
                <Route path="/create" component={CreateArticle} />
                <Route exact path="/edit" component={EditBookmark} />
                <Route exact path="/share/message" component={AddMessage} />
                <Route
                    exact
                    path="/share/sharinglink"
                    component={SharingLink}
                />
                <Route path="/share/sharinglink" component={ViewSharing} />
                <Route path="/metrics" component={dataDirectory} />
                <Route path="/" component={UserArticles} />
            </Switch>
        );
    }
}

export default withRouter(LoggedInRoutes);
