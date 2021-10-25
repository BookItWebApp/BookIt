import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <div className="top-section--wrapper">
            <div className="top_navbar">
                <Link to="/home">
                    <h3 className="top-navbar-links pure-button">Home</h3>
                </Link>
                <Link to="/metrics">
                    <h3 className="top-navbar-links pure-button">
                        User metrics
                    </h3>
                </Link>
                <Link to="/create">
                    <h3 className="top-navbar-links pure-button">
                        Create bookmark
                    </h3>
                </Link>
            </div>
        </div>

        // <div className="top-section--wrapper">
        //     <div className="top_navbar pure-menu pure-menu-horizontal pure-menu-scrollable">
        //         <ul className="pure-menu-list">
        //             <li className="pure-menu-item">
        //                 <Link to="/home">
        //                     <h1 className="app-name--header pure-menu-link">
        //                         BookIt
        //                     </h1>
        //                 </Link>
        //             </li>
        //             <li className="pure-menu-item">
        //                 <Link to="/metrics">
        //                     <h3 className="top-navbar-links pure-menu-link">
        //                         User metrics
        //                     </h3>
        //                 </Link>
        //             </li>
        //             <li className="pure-menu-item">
        //                 <Link to="/create">
        //                     <h3 className="top-navbar-links pure-menu-link">
        //                         Create bookmark
        //                     </h3>
        //                 </Link>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    );
};

export default Topbar;
