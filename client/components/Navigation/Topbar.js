import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ handleClick }) => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/metrics">User Metrics</Link>
      <Link to="/create">Add New Bookmark</Link>
      <a href="#" onClick={handleClick} className="btn btn-primary">
        Logout
      </a>
    </div>
  );
};

export default Topbar;
