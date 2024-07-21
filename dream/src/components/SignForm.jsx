import React, { useState } from "react";
import axios from "axios";
import "../styles/SignForm.css";
import YellowBtn from "../../src/components/YellowBtn";
import Checkbox from "../components/CheckBox";
import TermS from "../pages/accounts/TermS";
import TermP from "../pages/accounts/TermP";

const SignForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [allChecked, setAllChecked] = useState({
    termsAgree: false,
    privacyAgree: false,
    serviceAgree: false,
    allChecked: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 필수 항목 체크 확인
    if (
      !allChecked.termsAgree ||
      !allChecked.privacyAgree ||
      !allChecked.serviceAgree
    ) {
      setMessage("* 필수 약관에 동의해 주세요.");
      return;
    }

    // 유효성 검사
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.phone
    ) {
      setMessage("* 회원가입에 실패했습니다. 모든 정보를 채워주세요.");
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("* 유효한 이메일을 입력해주세요. ex) likelion@example.com");
      return;
    }

    // 비밀번호 일치 검사
    if (formData.password !== confirmPassword) {
      setMessage("* 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 연락처 형식 검사
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage("* 유효한 연락처를 입력해주세요. 예) 01012345678");
      return;
    }

    // 서버에 데이터 전송
    axios
      .post("http://127.0.0.1:8000/accounts/signup/", formData)
      .then((response) => {
        console.log("Signup successful", response.data);
        setMessage("회원가입이 완료되었습니다.");
      })
      .catch((error) => {
        console.error("Signup failed", error);
        setMessage("회원가입에 실패했습니다.");
      });
  };

  // 약관 팝업
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <div className="input-box">
            <div className="label-box">
              <label className="label" htmlFor="email">
                이메일
              </label>
              <span className="mustfill">* 필수 입력 항목입니다.</span>
            </div>
            <input
              className="input-field"
              type="email"
              id="email"
              placeholder="likelion@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <div className="label-box">
              <label className="label" htmlFor="password">
                비밀번호
              </label>
              <span className="mustfill">* 필수 입력 항목입니다.</span>
            </div>
            <input
              className="input-field"
              type="password"
              id="password"
              placeholder="영문/숫자/특수문자 혼합,10~16자"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-box no-margin-top">
            <input
              className="input-field"
              type="password"
              id="confirmPassword"
              placeholder="비밀번호를 한 번 더 입력해 주세요."
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <div className="label-box">
              <label className="label" htmlFor="name">
                이름
              </label>
              <span className="mustfill">* 필수 입력 항목입니다.</span>
            </div>
            <input
              className="input-field"
              type="text"
              id="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <div className="label-box">
              <label className="label" htmlFor="phone">
                연락처
              </label>
            </div>
            <input
              className="input-field"
              type="text"
              id="phone"
              placeholder="-없이 숫자만 입력해 주세요."
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <Checkbox allChecked={allChecked} setAllChecked={setAllChecked} />
        <button className="terms-button" onClick={() => setShowTerms(true)}>
          보기(이용약관)
        </button>
        <button className="terms-button" onClick={() => setShowPrivacy(true)}>
          보기(개인정보)
        </button>
        {message && <div className="message">{message}</div>}
        <div className="btn-box">
          <YellowBtn
            txt="동의하고 가입하기"
            type="submit"
            width="340px"
            disabled={!allChecked.allChecked}
          />
        </div>
      </form>
      {showTerms && (
        <div className="popup">
          <button onClick={() => setShowTerms(false)}>닫기</button>
          <pre>{TermS}</pre>
        </div>
      )}
      {showPrivacy && (
        <div className="popup">
          <button onClick={() => setShowPrivacy(false)}>닫기</button>
          <pre>{TermP}</pre>
        </div>
      )}
    </div>
  );
};

export default SignForm;
