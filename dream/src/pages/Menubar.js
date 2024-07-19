import React from "react";
import { Link, Outlet } from "react-router-dom";
// import "./Menubar.css";

const Menubar = () => {
  return (
    <>
      <div className="menubar">
        <ul className="menu-list">
          <li>
            <Link to="/" className="menu-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="menu-link">
              User
            </Link>
          </li>
          <li>
            <Link to="/" className="menu-link">
              User
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Menubar;
