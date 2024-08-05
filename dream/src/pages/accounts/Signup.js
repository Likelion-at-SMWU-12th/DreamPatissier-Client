import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cancel from "../../assets/cancel.svg";
import SignForm from "../../components/SignForm.jsx";

const Signup = () => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/accounts/login/");
  };

  return (
    <div>
      <TermBar>
        <Title>회원가입</Title>
        <CancelIcon src={Cancel} onClick={handleCancelClick} />
      </TermBar>
      <ContentWrap>
        <SignForm />
      </ContentWrap>
    </div>
  );
};

export default Signup;

//
// 스타일
//

// 상단 배너
const TermBar = styled.div``;

const Title = styled.p`
  margin: 0;
`;

const CancelIcon = styled.img`
  position: absolute;
  right: 27px;
  height: 30px;
  cursor: pointer;
`;

// 회원가입 폼 감싸기
const ContentWrap = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  padding-top: 70px;
  margin-bottom: 100px;
`;
