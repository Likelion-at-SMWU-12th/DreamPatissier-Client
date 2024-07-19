import React from "react";
import styled from "styled-components";
import logoIcon from "../assets/logoIcon.svg";

const Footer = () => {
  return (
    <FooterWrap>
      <FooterBox>
        <span>
          <img src={logoIcon} />
          빵긋빵굿의 파트너스를 모집합니다
          <img src={logoIcon} />
        </span>
        <br />
        여러분의 맛있고 행복한 웰니스 빵을 소개하고 싶으시다면?
        <br />
        <span className="">smilebbanggood@example.com</span>로 연락 주세요!
      </FooterBox>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  text-align: center;
  justify-content: center;
  width: 100%;
`;

const FooterBox = styled.div`
  background-color: #f8f8f8;
  padding: 13px 10%;
`;

export default Footer;
