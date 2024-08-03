import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Users.css";
import advertise from "../assets/advertise.png";
import profile from "../assets/myprofile.png";

const Users = () => {
  const navigate = useNavigate();
  const [resultId, setResultId] = useState(localStorage.getItem("result_id"));

  useEffect(() => {
    const newResultId = localStorage.getItem("result_id");
    if (newResultId !== resultId) {
      setResultId(newResultId);
    }
  }, [resultId]);

  const fetchResultIdFromServer = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://127.0.0.1:8000/test/result_id", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const newResultId = response.data.result_id;
      setResultId(newResultId);
      localStorage.setItem("result_id", newResultId);
    } catch (error) {
      console.error("서버에서 결과 ID를 가져오는 중 오류 발생:", error);
    }
  };

  const handleResultIdUpdate = async (e) => {
    e.preventDefault();
    await fetchResultIdFromServer();
    const latestResultId = localStorage.getItem("result_id");
    navigate(`/test/result/${latestResultId}`); // 최신 resultId로 이동
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("last_name");
      localStorage.removeItem("username");
      localStorage.removeItem("result_id");
      setResultId(null);
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
          <h2 className="profile-name">
            {localStorage.getItem("last_name") || "UNKNOWN"}
          </h2>
          <p className="profile-email">
            {localStorage.getItem("username") || "로그인 후 이용해주세요."}
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

        {resultId ? (
          <div className="option-link" onClick={handleResultIdUpdate}>
            빵 유형 테스트 결과 보기 &gt;
          </div>
        ) : (
          <div className="option-link" onClick={handleTestStart}>
            빵 유형 테스트 결과 보기 &gt;
          </div>
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
