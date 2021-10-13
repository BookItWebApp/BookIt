import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import CreateArticle from "./CreateArticle";
// import { me } from "./store";
// import Login from "./Login";
// import { connect } from "react-redux";

/**
 * COMPONENT
 */
export default class Routes extends Component {
  componentDidMount() {
    // this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <BrowserRouter>
        {isLoggedIn ? (
          <Switch>
            <Route path="/createArticle" component={CreateArticle} />
          </Switch>
        ) : (
          <div>login</div>
          // <Switch>
          //   <Route path="/" component={CreateArticle} />
          // </Switch>
        )}
      </BrowserRouter>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
//     // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes));
