import React from "react";
import "../styles/Users.css";
import { Link, useNavigate } from "react-router-dom";
import advertise from "../assets/advertise.png";
import profile from "../assets/myprofile.png";

const Users = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const nickname = localStorage.getItem("nickname");

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      localStorage.removeItem("username");
      navigate("/accounts/login/");
    }
  };

  return (
    <div className="user-page">
      <div className="profile-section">
        <img src={profile} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2 className="profile-name">{nickname ? nickname : "UNKNOWN"}</h2>
          <p className="profile-email">
            {username ? username : "로그인 후 이용해주세요."}
          </p>
        </div>
      </div>

      <div className="ad-banner">
        <img src={advertise} alt="Advertisement" />
      </div>

      <div className="user-options">
        <Link to="/users/orders" className="option-link">
          주문목록 &gt;
        </Link>
        <Link to="/users/reviews" className="option-link">
          My 리뷰 &gt;
        </Link>
        <Link to="/users/saved-recipes" className="option-link">
          저장한 레시피 &gt;
        </Link>
        <Link to="/users/my-recipes" className="option-link">
          My 레시피 &gt;
        </Link>
        <Link to="/test/result/1" className="option-link">
          빵 유형 테스트 &gt;
        </Link>
        <Link to="/of-use" className="option-link">
          서비스 이용약관 &gt;
        </Link>
        <Link
          to="/accounts/logout/"
          className="option-link"
          onClick={handleLogout}
        >
          로그아웃 &gt;
        </Link>
      </div>
    </div>
  );
};

export default Users;
