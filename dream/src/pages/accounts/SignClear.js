import React from "react";
import Cancel from "../../assets/cancel.svg";
import Logo from "../../assets/logoIcon.svg";

const SignClear = () => {
  return (
    <>
      <Bar>
        <Title>회원가입</Title>
        <CancelIcon src={Cancel} />
      </Bar>
      <ContentsWrap>
        <LogoIcon src={Logo} />
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
