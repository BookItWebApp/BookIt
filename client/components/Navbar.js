import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import Topbar from './Navigation/Topbar';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="navbar navbar-light bg-light static-top">
    <div class="container">
      <a
        class="navbar-brand"
        href="#!"
        style={{
          marginTop: '0px',
          marginBottom: '0px',
        }}
      >
        <img src="../../main-transparent.png" height="100px" />{' '}
      </a>
      {isLoggedIn ? (
        <Topbar handleClick={handleClick} />
      ) : (
        <div>
          <a href="https://github.com/BookItWebApp/BookItExtension">
            Get the BookIt Extension for Chrome Browser
          </a>
          <Link to="/signup">
            <a class="btn btn-primary" href="#signup">
              Sign Up
            </a>
          </Link>
        </div>
      )}
    </div>
  </nav>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

<nav class="navbar navbar-light bg-light static-top">
  <div class="container">
    <a class="navbar-brand" href="#!">
      Start Bootstrap
    </a>
    <a class="btn btn-primary" href="#signup">
      Sign Up
    </a>
  </div>
</nav>;
