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
        <LoginButton />
        <div>아직 회원이 아니신가요? 회원가입하기</div>
      </LoginBox>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div``;
const LoginBox = styled.div`
  background-color: pink;
`;
const ImgBox = styled.div``;
const TitleLogo = styled.img``;
const IconLogo = styled.img``;
const InputWrap = styled.div``;
const LoginButton = styled.button``;
