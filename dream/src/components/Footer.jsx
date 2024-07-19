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
        <Email>smilebbanggood@example.com</Email>로 연락 주세요!
      </FooterBox>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  background-color: #f8f8f8;
`;

const FooterBox = styled.div`
  padding: 13px 10%;
`;

const Email = styled.span`
  color: var(--brown);
  font-weight: bold;
`;

export default Footer;
