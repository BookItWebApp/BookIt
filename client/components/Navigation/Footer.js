import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-light" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
            <ul className="list-inline mb-2">
              <li className="list-inline-item">
                <a href="#!">About</a>
              </li>
              <li className="list-inline-item">⋅</li>
              <li className="list-inline-item">
                <a href="#!">Contact Us</a>
              </li>
            </ul>
            <p className="text-muted small mb-4 mb-lg-0">
              &copy; BookIt 2022. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
