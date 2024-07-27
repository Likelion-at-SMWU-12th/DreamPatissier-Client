import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import logoIcon from "../../assets/logoIcon.svg";
import logoTitle from "../../assets/logoTitle.svg";
import canSeeIcon from "../../assets/cansee.svg";
import noSeeIcon from "../../assets/nosee.svg";
import delPasswordIcon from "../../assets/delpassword.svg";
import YellowBtn from "../../components/YellowBtn";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const clearUsername = () => {
    setUsername("");
  };

  const clearPassword = () => {
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username && !password) {
      setMessage("ⓘ 아이디와 비밀번호를 입력해주세요.");
      return;
    } else if (!username) {
      setMessage("ⓘ 아이디를 입력해 주세요.");
      return;
    } else if (!password) {
      setMessage("ⓘ 비밀번호를 입력해 주세요.");
      return;
    }

    setMessage("");

    console.log("Submitted data:", { username, password });

    axios
      .post("http://127.0.0.1:8000/accounts/login/", {
        username,
        password,
      })
      .then((response) => {
        console.log("Login successful", response.data);
        // 로그인 성공 후 토큰 로컬 스토리지에 저장
        localStorage.setItem("token", response.data.token);
        // 페이지 이동
        navigate("/bakery");
      })
      .catch((error) => {
        console.log("Error response:", error.response);
        if (error.response) {
          console.error("Login failed", error.response.data);
          if (error.response.status === 400) {
            setMessage("ⓘ 입력한 정보를 확인해 주세요.");
          } else if (error.response.status === 401) {
            setMessage(
              error.response.data.errors.unauthorized ||
                "ⓘ 아이디와 비밀번호를 정확히 입력해주세요."
            );
          } else {
            setMessage("ⓘ 서버로부터의 응답을 처리하지 못했습니다.");
          }
        } else {
          console.error("Login error", error.message);
          setMessage("ⓘ 서버로부터 응답이 없습니다.");
        }
      });
  };

  return (
    <LoginWrap>
      <LoginBox>
        <ImgBox>
          <TitleLogo src={logoTitle} />
          <IconLogo src={logoIcon} />
        </ImgBox>
        <form onSubmit={handleSubmit}>
          <InputWrap>
            <InputBoxWrapper>
              <InputBox
                type="text"
                placeholder="아이디"
                value={username}
                onChange={handleUsernameChange}
              />
              <DelButton type="button" onClick={clearUsername}>
                <img src={delPasswordIcon} alt="Clear" />
              </DelButton>
            </InputBoxWrapper>
            <InputBoxWrapper>
              <InputBox
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              />
              <SeeButton type="button" onClick={togglePassword}>
                <img
                  src={showPassword ? canSeeIcon : noSeeIcon}
                  alt="Toggle visibility"
                />
              </SeeButton>
              <DelButton type="button" onClick={clearPassword}>
                <img src={delPasswordIcon} alt="Clear" />
              </DelButton>
            </InputBoxWrapper>
          </InputWrap>
          {message && <Message>{message}</Message>}

          <YellowBtn txt="로그인" type="submit" width={"275px"} />
        </form>
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
  margin-bottom: 29px;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
`;

const InputBoxWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 275px;
  height: 40px;
  margin-bottom: 10px;
`;

const InputBox = styled.input`
  line-height: 0;
  width: 105%;
  height: 100%;
  padding: 5px 10px;
  font-size: 14px;
  outline: none;
  margin-top: 10px;
  border: #d9d9d9 1px solid;
  border-radius: 0px;
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

const Button = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  cursor: pointer;

  img {
    width: 15px;
    height: 15px;
  }
`;

const SeeButton = styled(Button)`
  right: 35px;
`;

const DelButton = styled(Button)`
  right: 10px;
`;

const Message = styled.div`
  margin-top: -20px;
  margin-bottom: 7px;
  font-size: 12px;
  color: red;
  padding-left: 9px;
  font-weight: 800;
`;
