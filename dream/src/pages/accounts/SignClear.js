import React from "react";
import styled from "styled-components";
import Cancel from "../../assets/cancel.svg";
import Logo from "../../assets/logoIcon.svg";
import LogoLetter from "../../assets/logoLetter.png";

const SignClear = () => {
  return (
    <>
      <Bar>
        <Title>회원가입</Title>
        <CancelIcon src={Cancel} />
      </Bar>
      <ContentsWrap>
        <LogoIcon src={Logo} />
        <div>
          <div>
            <LogoLetterImg src={LogoLetter} />
            <span>에</span>
          </div>
          <div>오신 걸 환영합니다</div>
        </div>
        <button>빵 유형 테스트 하러가기</button>
        <button>메인 화면으로 이동하기</button>
      </ContentsWrap>
    </>
  );
};

export default SignClear;

const Bar = styled.div`
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 60px;
`;

const Title = styled.p`
  margin: 0;
`;

const CancelIcon = styled.img`
  position: absolute;
  right: 27px;
  height: 30px;
`;

const ContentsWrap = styled.div``;

const LogoIcon = styled.img``;

const LogoLetterImg = styled.img`
  width: 30%;
`;
