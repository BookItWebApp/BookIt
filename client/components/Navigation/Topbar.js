import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ handleClick }) => {
  return (
    <div>
      <Link to="/home">
        <a class="btn btn-primary" href="#signup">
          Home
        </a>
      </Link>
      <Link to="/metrics">
        <a class="btn btn-primary" href="#signup">
          User Metrics
        </a>
      </Link>
      <Link to="/create">
        <a class="btn btn-primary" href="#signup">
          Create Bookmark
        </a>
      </Link>
      <a href="#" onClick={handleClick} class="btn btn-primary">
        Logout
      </a>
    </div>
  );
};

export default Topbar;
