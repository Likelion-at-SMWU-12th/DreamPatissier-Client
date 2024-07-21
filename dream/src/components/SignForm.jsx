import React, { useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
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
      setMessage("필수 약관에 동의해 주세요.");
      return;
    }

    // 유효성 검사
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.phone
    ) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("유효한 이메일을 입력해주세요. ex) 0123abc@aaa.com");
      return;
    }

    // 비밀번호 일치 검사
    if (formData.password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 연락처 형식 검사
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage("유효한 연락처를 입력해주세요. 예) 01012345678");
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
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputBox>
            <StyledLabel htmlFor="email">이메일</StyledLabel>
            <StyledSpan>* 필수 입력 항목입니다.</StyledSpan>
            <br />
            <StyledInput
              type="email"
              id="email"
              placeholder="likelion@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </InputBox>
          <InputBox>
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            <StyledSpan>* 필수 입력 항목입니다.</StyledSpan>
            <br />
            <StyledInput
              type="password"
              id="password"
              placeholder="영문/숫자/특수문자 혼합,10~16자"
              value={formData.password}
              onChange={handleChange}
            />
          </InputBox>
          <InputBox $noMarginTop>
            <StyledInput
              type="password"
              id="confirmPassword"
              placeholder="비밀번호를 한 번 더 입력해 주세요."
              value={confirmPassword}
              onChange={handleChange}
            />
          </InputBox>
          <InputBox>
            <StyledLabel htmlFor="name">이름</StyledLabel>
            <StyledSpan>*필수 입력</StyledSpan>
            <br />
            <StyledInput
              type="text"
              id="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
            />
          </InputBox>
          <InputBox>
            <StyledLabel htmlFor="phone">연락처</StyledLabel>
            <br />
            <StyledInput
              type="text"
              id="phone"
              placeholder="-없이 숫자만 입력해 주세요."
              value={formData.phone}
              onChange={handleChange}
            />
          </InputBox>
        </InputWrapper>
        <Checkbox allChecked={allChecked} setAllChecked={setAllChecked} />
        <TermsButton onClick={() => setShowTerms(true)}>
          보기(이용약관)
        </TermsButton>
        <TermsButton onClick={() => setShowPrivacy(true)}>
          보기(개인정보)
        </TermsButton>
        {message && <Message>{message}</Message>}
        <BtnBox>
          <YellowBtn
            txt="동의하고 가입하기"
            type="submit"
            width="340px"
            disabled={!allChecked.allChecked}
          />
        </BtnBox>
      </form>
      {showTerms && (
        <Popup>
          <button onClick={() => setShowTerms(false)}>닫기</button>
          <pre>{TermS}</pre>
        </Popup>
      )}
      {showPrivacy && (
        <Popup>
          <button onClick={() => setShowPrivacy(false)}>닫기</button>
          <pre>{TermP}</pre>
        </Popup>
      )}
    </FormWrapper>
  );
};

export default SignForm;

const InputWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: blue;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: green;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  background-color: pink;
  border: 1px solid red;
  width: 310px;
  ${(props) =>
    props.$noMarginTop &&
    css`
      margin-top: -20px;
    `}
`;

const StyledInput = styled.input`
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  width: 300px;
  height: 45px;
  font-size: 14px;
`;

const StyledLabel = styled.label`
  font-size: 18px;
`;

const StyledSpan = styled.span`
  color: var(--grey);
  font-size: 10px;
  padding-left: 7px;
`;

const Message = styled.div`
  color: red;
  margin-top: 10px;
  font-size: 12px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TermsButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  pre {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
`;
