import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import YellowBtn from "../../src/components/YellowBtn";
import Checkbox from "../components/CheckBox";

const SignForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [allChecked, setAllChecked] = useState({
    termsAgree: false,
    privacyAgree: false,
    serviceAgree: false,
    allChecked: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
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
      !formData.confirmPassword ||
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
    if (formData.password !== formData.confirmPassword) {
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

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputBox>
            <StyledLabel htmlFor="email">이메일</StyledLabel>
            <StyledSpan>*필수 입력</StyledSpan>
            <br />
            <StyledInput
              type="email"
              id="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
            />
          </InputBox>
          <InputBox>
            <StyledLabel htmlFor="password">비밀번호</StyledLabel>
            <StyledSpan>*필수 입력</StyledSpan>
            <br />
            <StyledInput
              type="password"
              id="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
          </InputBox>
          <InputBox>
            <StyledLabel htmlFor="confirmPassword">비밀번호 확인</StyledLabel>
            <StyledSpan>*필수 입력</StyledSpan>
            <br />
            <StyledInput
              type="password"
              id="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
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
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* width: 600px; */
  /* margin: auto; */
  width: 100%;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  width: 310px;
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
  font-size: 9px;
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
