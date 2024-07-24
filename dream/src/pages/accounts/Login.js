import React, { useState } from "react";
import styled from "styled-components";
import logoIcon from "../../assets/logoIcon.svg";
import logoTitle from "../../assets/logoTitle.svg";
import YellowBtn from "../../components/YellowBtn";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <LoginWrap>
      <LoginBox>
        <ImgBox>
          <TitleLogo src={logoTitle} />
          <IconLogo src={logoIcon} />
        </ImgBox>
        <InputWrap>
          <InputBox
            type="text"
            placeholder="아이디"
            value={username}
            onChange={handleUsernameChange}
          />
          <InputBox
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputWrap>
        <YellowBtn txt="로그인" type="submit" width={"275px"} />
        <Guide>
          아직 회원이 아니신가요?{" "}
          <Highlight to="/accounts/signup/">회원가입하기</Highlight>
        </Guide>
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
  background-color: white;
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  padding: 20px;
`;
const ImgBox = styled.div`
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 5px;
`;
const TitleLogo = styled.img`
  width: 185px;
  margin-bottom: 25px;
`;
const IconLogo = styled.img`
  width: 100px;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1.5px solid #d9d9d9;
`;

const InputBox = styled.input`
  border: #d9d9d9 1px solid;
  line-height: 0;
  width: 250px;
  height: 40px;
  padding: 5px 10px;
  font-size: 14px;
  outline: none;
`;

const Guide = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: var(--grey);
`;

const Highlight = styled(Link)`
  color: var(--brown);
  text-decoration: underline;
  font-weight: bold;
`;
