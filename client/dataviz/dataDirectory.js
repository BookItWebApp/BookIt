import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { TimeChartOne } from './TimeChart1';
import { getArticles } from '../store/articles';

class DataDirectory extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    return (
      <div>
        <div>Choose a Data Viz</div>
        <Link to="/metrics/table1" state={this.props}>
          Test Table
        </Link>
        <Switch>
          <Route path="/metrics/table1" component={TimeChartOne} />
          <Redirect to="/metrics" />
        </Switch>
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
    allArticles: state.allArticles,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(getArticles());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(DataDirectory));
