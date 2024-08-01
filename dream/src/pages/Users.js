import React from "react";
import "../styles/Users.css";
import { Link, useNavigate } from "react-router-dom";
import advertise from "../assets/advertise.png";
import profile from "../assets/myprofile.png";

const Users = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const last_name = localStorage.getItem("last_name");
  const resultId = localStorage.getItem("result_id"); // 로그인 후 결과 ID를 로컬 스토리지에 저장

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("last_name");
      localStorage.removeItem("username");
      localStorage.removeItem("result_id"); // 로그아웃 시 result_id 삭제
      navigate("/accounts/login/");
    }
  };

  const handleTestStart = () => {
    const startTest = window.confirm(
      "빵 유형 테스트를 해주세요\n\n'하러가기'를 클릭하면 시작합니다."
    );
    if (startTest) {
      navigate("/test/questions/1");
    }
  };

  return (
    <div className="user-page">
      <div className="profile-section">
        <img src={profile} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h2 className="profile-name">{last_name ? last_name : "UNKNOWN"}</h2>
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

        {/* 결과 ID가 존재할 경우 링크를 제공, 그렇지 않으면 테스트 시작을 요청 */}
        {resultId ? (
          <Link to={`/test/result/${resultId}`} className="option-link">
            빵 유형 테스트 결과 보기 &gt;
          </Link>
        ) : (
          <p className="option-link" onClick={handleTestStart}>
            빵 유형 테스트를 시작하세요 &gt;
          </p>
        )}

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
