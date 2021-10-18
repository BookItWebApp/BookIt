import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import SingleArticle from './components/SingleArticle';
import { UserArticles } from './components/UserArticles';
import { AddMessage } from './components/sharing/AddMessage';
import { SharingLink } from './components/sharing/SharingLink';
import { ViewSharing } from './components/sharing/ViewSharing';
import { me } from './store';
import dataDirectory from './dataviz/dataDirectory';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div className="routes-div--wrapper">
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={UserArticles} />
            <Route exact path="/share/message" component={AddMessage} />
            <Route exact path="/share/sharinglink" component={SharingLink} />
            <Route path="/share/sharinglink" component={ViewSharing} />
            <Route path="/metrics" component={dataDirectory} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/share/sharinglink" component={ViewSharing} />
          </Switch>
        )}
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
