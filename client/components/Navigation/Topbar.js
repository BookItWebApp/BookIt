import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ handleClick }) => {
  return (
    <div className="top-section--wrapper">
      <div className="top_navbar">
        <Link to="/home">
          <h3 className="top-navbar-links pure-button">Home</h3>
        </Link>
        <Link to="/metrics">
          <h3 className="top-navbar-links pure-button">User metrics</h3>
        </Link>
        <Link to="/create">
          <h3 className="top-navbar-links pure-button">Create bookmark</h3>
        </Link>
        {/* <h3 className="top-navbar-links pure-button"> */}
        <a
          href="#"
          onClick={handleClick}
          className="logo-btn-navbar--link top-navbar-links pure-button"
        >
          Logout
        </a>
        {/* </h3> */}
      </div>
    </div>
  );
};

export default Topbar;
