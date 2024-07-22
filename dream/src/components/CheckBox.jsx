import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 왜 활성화 되지 않지?!
const Checkbox = ({ allChecked, setAllChecked }) => {
  const [checkList, setCheckList] = useState({
    allAgree: false,
    termsAgree: false,
    privacyAgree: false,
    serviceAgree: false,
    adsAgree: false,
    marketingAgree: false,
  });

  const handleAllAgree = (e) => {
    const checked = e.target.checked;
    setCheckList({
      allAgree: checked,
      termsAgree: checked,
      privacyAgree: checked,
      serviceAgree: checked,
      adsAgree: checked,
      marketingAgree: checked,
    });
    console.log("handleAllAgree called, checked:", checked);
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    setCheckList((prevState) => ({ ...prevState, [id]: checked }));
    console.log("handleCheck called, id:", id, "checked:", checked);
  };

  useEffect(() => {
    const { termsAgree, privacyAgree, serviceAgree, adsAgree, marketingAgree } =
      checkList;
    const allCk =
      termsAgree && privacyAgree && serviceAgree && adsAgree && marketingAgree;
    setAllChecked({
      termsAgree,
      privacyAgree,
      serviceAgree,
      adsAgree,
      marketingAgree,
      allChecked: allCk,
    });
    console.log("useEffect called, checkList:", checkList, "allCk:", allCk);
  }, [checkList, setAllChecked]);

  return (
    <AgreeContainer>
      <CheckboxItem>
        <StyledCheck
          type="checkbox"
          id="allAgree"
          checked={checkList.allAgree}
          onChange={handleAllAgree}
        />
        <Allcheck htmlFor="allAgree">약관 전체 동의</Allcheck>
      </CheckboxItem>
      <StyledLine />
      <CheckboxItem>
        <StyledCheck
          type="checkbox"
          id="termsAgree"
          checked={checkList.termsAgree}
          onChange={handleCheck}
        />
        <SmallCheck htmlFor="termsAgree">
          [필수] 만 14세 이상 서비스 이용 동의
        </SmallCheck>
      </CheckboxItem>
      <CheckboxItem>
        <StyledCheck
          type="checkbox"
          id="privacyAgree"
          checked={checkList.privacyAgree}
          onChange={handleCheck}
        />
        <SmallCheck htmlFor="privacyAgree">
          [필수] 개인정보 수집/이용 동의
        </SmallCheck>
      </CheckboxItem>
      <CheckboxItem>
        <StyledCheck
          type="checkbox"
          id="serviceAgree"
          checked={checkList.serviceAgree}
          onChange={handleCheck}
        />
        <SmallCheck htmlFor="serviceAgree">[필수] 서비스 이용 약관</SmallCheck>
      </CheckboxItem>
      <CheckboxItem>
        <StyledCheck
          type="checkbox"
          id="adsAgree"
          checked={checkList.adsAgree}
          onChange={handleCheck}
        />
        <SmallCheck htmlFor="adsAgree">[선택] 광고성 정보 수신 동의</SmallCheck>
      </CheckboxItem>
      <CheckboxItem>
        <StyledCheck
          type="checkbox"
          id="marketingAgree"
          checked={checkList.marketingAgree}
          onChange={handleCheck}
        />
        <SmallCheck htmlFor="marketingAgree">
          [선택] 마케팅 정보/이용 동의
        </SmallCheck>
      </CheckboxItem>
    </AgreeContainer>
  );
};

export default Checkbox;

const AgreeContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheck = styled.input`
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  cursor: pointer;
  position: relative;
  margin-right: 10px;

  &:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: var(--yellow);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Allcheck = styled.label`
  font-size: 18px;
`;

const SmallCheck = styled.label`
  font-size: 13px;
  color: var(--grey);
  letter-spacing: -0.5px;
`;

const StyledLine = styled.div`
  margin: 5px 0px;
  border-bottom: var(--yellow) 1px solid;
`;
