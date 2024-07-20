import React from "react";
import styled from "styled-components";
import Cancel from "../../assets/cancel.svg";
import SignForm from "../../components/SignForm.jsx";

const Signup = () => {
  return (
    <div>
      <Bar>
        <Title>회원가입</Title>
        <CancelIcon src={Cancel} />
      </Bar>
      <SignForm />
    </div>
  );
};

export default Signup;

const Bar = styled.div`
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 70px;
`;

const Title = styled.p`
  margin: 0;
`;

const CancelIcon = styled.img`
  position: absolute;
  right: 27px;
  height: 30px;
`;
