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
  // 비밀번호 & 비밀번호 확인 지우기 버튼
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handlePwChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePw2Change = (e) => {
    setPassword2(e.target.value);
  };

  const clearPassword = () => {
    setPassword("");
  };

  const clearPassword2 = () => {
    setPassword2("");
  };

  // 비밀번호 & 비밀번호 보이기(토글) 버튼
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  // 체크박스 관련
  const [allChecked, setAllChecked] = useState({
    termsAgree: false,
    privacyAgree: false,
    serviceAgree: false,
    adsAgree: false,
    marketingAgree: false,
    allChecked: false,
  });
  const [showPopup, setShowPopup] = useState({
    show: false,
    title: "",
    content: null,
  });

  const handleAllCheckedChange = () => {
    const newCheckedStatus = !allChecked.allChecked;
    setAllChecked({
      termsAgree: newCheckedStatus,
      privacyAgree: newCheckedStatus,
      serviceAgree: newCheckedStatus,
      adsAgree: newCheckedStatus,
      marketingAgree: newCheckedStatus,
      allChecked: newCheckedStatus,
    });
  };

  const handleIndividualCheck = (name) => {
    setAllChecked((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: !prevState[name],
      };
      const allAreChecked = Object.keys(updatedState).every(
        (key) => updatedState[key] === true
      );
      updatedState.allChecked = allAreChecked;
      return updatedState;
    });
  };

  // 팝업
  const openPopup = (title, content) => {
    setShowPopup({ show: true, title, content });
  };

  const closePopup = () => {
    setShowPopup({ show: false, title: "", content: null });
  };

  return (
    <>
      <HiddenDiv />

      {/* 인풋 필드 */}
      <form>
        <SignInputContainer>
          <SignInputWarp>
            <SignBox>
              <LabelBox htmlFor="username" type="static">
                아이디 <RequiredEnter>* 필수 입력 항목입니다.</RequiredEnter>
              </LabelBox>
              <SignInput placeholder="영문소문자/숫자,4~12자"></SignInput>
            </SignBox>
            <SignBox>
              <LabelBox htmlFor="password">
                비밀번호 <RequiredEnter>* 필수 입력 항목입니다.</RequiredEnter>
              </LabelBox>
              <SignInputBox>
                <SignInput
                  value={password}
                  type={showPassword ? "static" : "password"}
                  placeholder="영문/숫자/특수문자 혼합,10~16자"
                  onChange={handlePwChange}
                ></SignInput>
                <PWSeeBtn type="button" onClick={togglePassword}>
                  <img src={showPassword ? canSeeIcon : noSeeIcon} />
                </PWSeeBtn>
                <PWDelBtn type="button" onClick={clearPassword}>
                  <img src={delPasswordIcon} />
                </PWDelBtn>
              </SignInputBox>
            </SignBox>
            <SignBox>
              <LabelBox htmlFor="password2">
                비밀번호 확인{" "}
                <RequiredEnter>* 필수 입력 항목입니다.</RequiredEnter>
              </LabelBox>
              <SignInputBox>
                <SignInput
                  onChange={handlePw2Change}
                  type={showPassword2 ? "static" : "password"}
                  value={password2}
                  placeholder="비밀번호를 한 번 더 입력해 주세요."
                ></SignInput>
                <PW2SeeBtn type="button" onClick={togglePassword2}>
                  <img src={showPassword2 ? canSeeIcon : noSeeIcon} />
                </PW2SeeBtn>
                <PW2DelBtn type="button" onClick={clearPassword2}>
                  <img src={delPasswordIcon} />
                </PW2DelBtn>
              </SignInputBox>
            </SignBox>
            <SignBox>
              <LabelBox htmlFor="nickname">
                이름 <RequiredEnter>* 필수 입력 항목입니다.</RequiredEnter>
              </LabelBox>
              <SignInput placeholder="김사자"></SignInput>
            </SignBox>
            <SignBox>
              <LabelBox htmlFor="phone">연락처</LabelBox>
              <SignInput placeholder="-없이 숫자만 입력해 주세요."></SignInput>
            </SignBox>
          </SignInputWarp>
        </SignInputContainer>

        {/* 체크박스  */}
        <AgreeContainer>
          <CheckboxItem>
            <StyledCheck
              type="checkbox"
              checked={allChecked.allChecked}
              onChange={handleAllCheckedChange}
            />
            <Allcheck htmlFor="allAgree">약관 전체 동의</Allcheck>
          </CheckboxItem>
          <StyledLine />
          <CheckboxItem>
            <StyledCheck
              type="checkbox"
              checked={allChecked.termsAgree}
              onChange={() => handleIndividualCheck("termsAgree")}
            />
            <SmallCheck htmlFor="termsAgree">
              [필수] 만 14세 이상 서비스 이용 동의
            </SmallCheck>
          </CheckboxItem>
          <CheckboxItem>
            <StyledCheck
              type="checkbox"
              checked={allChecked.privacyAgree}
              onChange={() => handleIndividualCheck("privacyAgree")}
            />
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
            <StyledCheck
              type="checkbox"
              checked={allChecked.serviceAgree}
              onChange={() => handleIndividualCheck("serviceAgree")}
            />
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
            <StyledCheck
              type="checkbox"
              checked={allChecked.adsAgree}
              onChange={() => handleIndividualCheck("adsAgree")}
            />
            <SmallCheck htmlFor="adsAgree">
              [선택] 광고성 정보 수신 동의
            </SmallCheck>
          </CheckboxItem>
          <CheckboxItem>
            <StyledCheck
              type="checkbox"
              checked={allChecked.marketingAgree}
              onChange={() => handleIndividualCheck("marketingAgree")}
            />
            <SmallCheck htmlFor="marketingAgree">
              [선택] 마케팅 정보/이용 동의
            </SmallCheck>
          </CheckboxItem>
        </AgreeContainer>
        {showPopup.show && (
          <Popup title={showPopup.title} onClose={closePopup}>
            {showPopup.content}
          </Popup>
        )}

        {/* 가입 버튼 */}
        <YBtnBox>
          <YellowBtn
            txt="동의하고 가입하기"
            type="submit"
            width="80%"
            disabled={!allChecked.allChecked}
          />
        </YBtnBox>
      </form>
    </>
  );
};

export default SignForm;

// 스타일

const HiddenDiv = styled.div`
  width: 100%;
  height: ${(props) => (props.isError ? "90px" : "0")};
  transition: height 0.4s;
`;

//인풋필드 스타일
const SignInputContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const SignInputWarp = styled.div`
  width: 75%;
`;
const SignBox = styled.div``;

const LabelBox = styled.label`
  font-size: 18px;
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
`;
const RequiredEnter = styled.div`
  font-size: 9px;
  color: #8a8888;
  margin-left: 7px;
`;

const SignInputBox = styled.div`
  display: flex;
  position: relative;
`;

const SignInput = styled.input`
  font-size: 14px;
  width: 94%;
  border: 2px solid #d9d9d9;
  height: 44px;
  border-radius: 5px;
  outline: none;
  padding: 0px 0px 0px 10px;
  margin-bottom: 25px;
`;

const PWSeeBtn = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  top: 48.5%;
  right: 12%;
  transform: translateY(-100%);
`;

const PW2SeeBtn = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  top: 48.5%;
  right: 12%;
  transform: translateY(-100%);
`;

const PWDelBtn = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  position: absolute;
  top: 48%;
  right: 5%;
  transform: translateY(-100%);
`;

const PW2DelBtn = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  position: absolute;
  top: 48%;
  right: 5%;
  transform: translateY(-100%);
`;

// 에러메세지
const Message = styled.div`
  text-align: center;
  font-weight: 800;
  color: #ff3b3b;
  margin-top: 15px;
  margin-bottom: -15px;
  font-size: 12px;
`;

const ErrorMessage = styled.div`
  font-weight: 800;
  color: #ff3b3b;
  font-size: 11px;
  padding-top: 10px;
  margin-bottom: -5px;
`;

// 버튼
const YBtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-top: 10px;
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
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const CheckboxItem = styled.div`
  display: flex;
  justify-content: left;
  margin-left: 60px;
  width: 300px;
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
  margin: 0px 60px 5px 60px;
  border-bottom: var(--yellow) 1px solid;
`;

const SeeButton = styled.button`
  position: absolute;
  right: 60px;
  font-size: 10px;
  text-decoration-line: none;
  color: var(--grey);
  font-weight: 500;
  border: none;
  background-color: white;
  cursor: pointer;
`;
