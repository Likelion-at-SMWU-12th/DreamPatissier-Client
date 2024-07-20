import React from "react";
import styled from "styled-components";
import logoIcon from "../../assets/logoIcon.svg";
import logoTitle from "../../assets/logoTitle.svg";

const Login = () => {
  return (
    <LoginWrap>
      <LoginBox>
        <ImgBox>
          <TitleLogo src={logoTitle} />
          <IconLogo src={logoIcon} />
        </ImgBox>
        <InputWrap>
          <input type="text"></input>
          <input type="password"></input>
        </InputWrap>
        <LoginButton>로그인</LoginButton>
        <div>아직 회원이 아니신가요? 회원가입하기</div>
      </LoginBox>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
`;
const LoginBox = styled.div`
  background-color: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const ImgBox = styled.div`
  width: 200px;
  height: 250px;
  background-color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const TitleLogo = styled.img`
  background-color: yellow;
  width: 185px;
  margin-bottom: 25px;
`;
const IconLogo = styled.img`
  background-color: green;
  width: 100px;
`;
const InputWrap = styled.div``;
const LoginButton = styled.button``;
