import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ handleClick }) => {
  return (
    <div>
      <Link to="/home">
        <a href="#signup">Home</a>
      </Link>
      <Link to="/metrics">
        <a href="#signup">User Metrics</a>
      </Link>
      <Link to="/create">
        <a href="#signup">Add New Bookmark</a>
      </Link>
      <a href="#" onClick={handleClick} class="btn btn-primary">
        Logout
      </a>
    </div>
  );
};

export default Topbar;
