import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import YellowBtn from "../../src/components/YellowBtn";
import TermS from "../pages/accounts/TermS";
import TermP from "../pages/accounts/TermP";
import Popup from "../components/Popup";
import styled from "styled-components";
import canSeeIcon from "../assets/cansee.svg";
import noSeeIcon from "../assets/nosee.svg";
import delPasswordIcon from "../assets/delpassword.svg";

const SignForm = () => {
  const [showT, setShowT] = useState(false);
  const [showP, setShowP] = useState(false);
  const [allChecked, setAllChecked] = useState({
    termsAgree: false,
    privacyAgree: false,
    serviceAgree: false,
    allChecked: false,
  });
  const [showPopup, setShowPopup] = useState({
    show: false,
    title: "",
    content: null,
  });

  const openPopup = (title, content) => {
    setShowPopup({ show: true, title, content });
  };

  const closePopup = () => {
    setShowPopup({ show: false, title: "", content: null });
  };

  return (
    <>
      <HiddenDiv />
      <form>
        <AgreeContainer>
          <CheckboxItem>
            <StyledCheck type="checkbox" />
            <Allcheck htmlFor="allAgree">약관 전체 동의</Allcheck>
          </CheckboxItem>
          <StyledLine />
          <CheckboxItem>
            <StyledCheck type="checkbox" />
            <SmallCheck htmlFor="termsAgree">
              [필수] 만 14세 이상 서비스 이용 동의
            </SmallCheck>
          </CheckboxItem>
          <CheckboxItem>
            <StyledCheck type="checkbox" />
            <SmallCheck htmlFor="privacyAgree">
              [필수] 개인정보 수집/이용 동의
            </SmallCheck>
            <SeeButton
              type="button"
              onClick={() => openPopup("개인정보 수집/이용 동의", <TermP />)}
            >
              보기
            </SeeButton>
          </CheckboxItem>
          <CheckboxItem>
            <StyledCheck type="checkbox" />
            <SmallCheck htmlFor="serviceAgree">
              [필수] 서비스 이용 약관
            </SmallCheck>
            <SeeButton
              type="button"
              onClick={() => openPopup("서비스 이용 약관", <TermS />)}
            >
              보기
            </SeeButton>
          </CheckboxItem>
          <CheckboxItem>
            <StyledCheck type="checkbox" />
            <SmallCheck htmlFor="adsAgree">
              [선택] 광고성 정보 수신 동의
            </SmallCheck>
          </CheckboxItem>
          <CheckboxItem>
            <StyledCheck type="checkbox" />
            <SmallCheck htmlFor="marketingAgree">
              [선택] 마케팅 정보/이용 동의
            </SmallCheck>
          </CheckboxItem>
        </AgreeContainer>
        <BtnBox>
          <YellowBtn
            txt="동의하고 가입하기"
            type="submit"
            width="340px"
            disabled={!allChecked.allChecked}
          />
        </BtnBox>
      </form>
      {showPopup.show && (
        <Popup title={showPopup.title} onClose={closePopup}>
          {showPopup.content}
        </Popup>
      )}
    </>
  );
};

export default SignForm;

const HiddenDiv = styled.div`
  width: 100%;
  height: ${(props) => (props.isError ? "90px" : "0")};
  transition: height 0.4s;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-top: 10px;
`;

const ErrorMessage = styled.div`
  font-weight: 800;
  color: #ff3b3b;
  font-size: 11px;
  padding-top: 10px;
  margin-bottom: -5px;
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

// Checkbox 관련 스타일
const AgreeContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const CheckboxItem = styled.div`
  display: flex;
  justify-content: left;
`;

const StyledCheck = styled.input`
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 14.5px;
  height: 14.5px;
  cursor: pointer;
  margin-right: 10px;
  position: relative;

  &:checked {
    border-color: var(--yellow);

    &::after {
      content: "";
      position: absolute;
      top: 40%;
      left: 50%;
      width: 30%;
      height: 50%;
      border: solid var(--yellow);
      border-width: 0 1px 1px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
`;

const Allcheck = styled.label`
  font-size: 18px;
`;

const SmallCheck = styled.label`
  font-size: 12px;
  color: var(--grey);
  letter-spacing: -0.5px;
  line-height: 22px;
  margin-bottom: -10px;
`;

const StyledLine = styled.div`
  margin: 5px 0px;
  border-bottom: var(--yellow) 1px solid;
`;

const SeeButton = styled.button`
  position: absolute;
  right: 10px;
  font-size: 10px;
  text-decoration-line: none;
  color: var(--grey);
  font-weight: 500;
  border: none;
  background-color: white;
  cursor: pointer;
`;
