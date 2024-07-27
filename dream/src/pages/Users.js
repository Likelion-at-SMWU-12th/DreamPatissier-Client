import React from "react";
import "../styles/Users.css";
import { Link } from "react-router-dom";
import advertise from "../assets/advertise.png";
import profile from "../assets/myprofile.png";

//
// 마이페이지
//

const Users = () => {
  return (
    <div className="user-page">
      <div className="profile-section">
        <img src={profile} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2 className="profile-name">빵사자</h2>
          <p className="profile-email">likelion@example.com</p>
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
        <Link to="/accounts/logout/" className="option-link">
          로그아웃 &gt;
        </Link>
      </div>
    </div>
  );
};

export default Users;
