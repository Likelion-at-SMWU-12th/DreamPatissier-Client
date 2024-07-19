import React from "react";
import "../styles/Users.css";
import { Link } from "react-router-dom";
import advertise from "../assets/advertise.png";

const Users = () => {
  return (
    <div className="user-page">
      <div className="profile-section">
        <img src="profile-pic-url.jpg" alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-email">johndoe@example.com</p>
          <button className="edit-button">Edit Profile</button>
        </div>
      </div>

      <div className="ad-banner">
        <img src={advertise} alt="Advertisement" />
      </div>

      <div className="user-options">
        <Link to="/users/orders" className="option-link">
          주문목록
        </Link>
        <Link to="/users/reviews" className="option-link">
          My 리뷰
        </Link>
        <Link to="/users/saved-recipes" className="option-link">
          저장한 레시피
        </Link>
        <Link to="/users/my-recipes" className="option-link">
          My 레시피
        </Link>
        <Link to="/test/result/{int:pk}" className="option-link">
          빵 유형 테스트
        </Link>
        <Link to="/of-use" className="option-link">
          서비스 이용약관
        </Link>
        <Link to="/accounts/logout/" className="option-link">
          로그아웃
        </Link>
      </div>
    </div>
  );
};

export default Users;
