import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../styles/Menubar.css";
import logo from "../assets/logo.png";

// 유형테스트 할때 메뉴바 일부분만 숨겨질 수 있도록 수정했어요~~

const Menubar = () => {
  const location = useLocation();
  const isTestPath = location.pathname.startsWith("/test");

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
            <Link to="/menu" className="icon">
              <i className="fas fa-bars"></i>
            </Link>
          </div>
        </div>
        {!isTestPath && (
          <div className="menu-row2">
            <ul className="menu-list">
              <li>
                <Link to="/bakery" className="menu-link">
                  웰니스빵
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="menu-link">
                  빵레시피
                </Link>
              </li>
              <li>
                <Link to="/diary" className="menu-link">
                  빵기록
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Menubar;
