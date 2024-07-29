import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/SideBar";
import "../styles/Menubar.css";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const isTestPath =
    location.pathname.startsWith("/test") ||
    location.pathname.startsWith("/cart/orderclear");

  const getLinkClass = (path) => {
    return location.pathname.startsWith(path)
      ? "menu-link active"
      : "menu-link";
  };

  return (
    <>
      <div className="menubar">
        <div className="menu-row1">
          <div className="logo">
            <Link to="/bakery">
              <img src={logo} alt="Logo" className="logo-image" />
            </Link>
          </div>
          <div className="icons">
            <Link to="/cart" className="icon">
              <i className="fas fa-shopping-cart"></i>
            </Link>
            <Link to="/users" className="icon">
              <i className="fas fa-user"></i>
            </Link>
            <SidebarBtn onClick={toggleSide} className="icon">
              <i className="fas fa-bars"></i>
            </SidebarBtn>
          </div>
        </div>
        {!isTestPath && (
          <div className="menu-row2">
            <ul className="menu-list">
              <li>
                <Link to="/bakery" className={getLinkClass("/bakery")}>
                  웰니스빵
                </Link>
              </li>
              <li>
                <Link to="/recipes" className={getLinkClass("/recipes")}>
                  빵레시피
                </Link>
              </li>
              <li>
                <Link to="/diary" className={getLinkClass("/diary")}>
                  빵기록
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Outlet />
    </>
  );
};

export default Menubar;

const SidebarBtn = styled.button`
  border: none;
  background-color: white;
  margin-left: -7px;
`;
