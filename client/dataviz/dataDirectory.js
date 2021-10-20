import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { TimeChart } from './TimeChart';
import { me } from '../store';
import { getArticles } from '../store/articles';
import { getUserArticles } from '../store/userArticles';
import { Calendar } from './Calendar';
import { TagRatio } from './TagRatio';
import { Indicator } from './indicator';
import Topbar from "../components/Navigation/Topbar";
import { UserMetrics } from './UserMetrics';


class DataDirectory extends Component {
    componentDidMount() {
        this.props.loadInitialData();
    }
    componentDidUpdate(prevProps) {
        if (
            this.props.allArticles.length != prevProps.allArticles.length ||
            this.props.userArticles.lenth != prevProps.userArticles.lenth
        ) {
            this.props.UserArticles(this.props.userId);
        }
    }


  render() {
    return (
      <div>
        <UserMetrics/>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        userId: state.auth.id,
        allArticles: state.allArticles,
        userArticles: state.userArticles
    };
};

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me());
            dispatch(getArticles());
        },
        UserArticles: (id) => dispatch(getUserArticles(id))
    };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(DataDirectory));
