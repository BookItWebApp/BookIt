import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
        <div className="navbar-header">
            <div className="brand-wrapper">
              <div className="brand-name-wrapper">
                  <Link to="/home">
                    <h1>BookIt</h1>
                  </Link>
              </div>
            </div>
        </div>
  )
}

export default Header
