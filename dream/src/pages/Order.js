import React from "react";
import styled from "styled-components";
import YellowBtn from "../components/YellowBtn";
import TossPay from "../assets/tosspay.png";
import NPay from "../assets/npay.png";
import KakaoPay from "../assets/kakaopay.png";

const Order = () => {
  return (
    <>
      <DeliveryWrap>
        <InfoText>배송지 정보</InfoText>
        <InputWrap>
          <InputBox>
            <StyledInput placeholder="받는 분" type="text" />
            <StyledInput placeholder="우편번호" type="text" />
            <StyledInput placeholder="상세 주소" type="text" />
            <StyledInput placeholder="연락처" type="text" />
          </InputBox>
        </InputWrap>
      </DeliveryWrap>
      <HrDiv />
      <PayWrap>
        <PayTitle>결제수단</PayTitle>
        <PayOption>
          <StyledCheck type="checkbox" />
          <PayText>
            <PayImage src={TossPay} alt="토스페이" /> 토스페이
          </PayText>
        </PayOption>
        <PayOption>
          <StyledCheck type="checkbox" />
          <PayText>
            <PayImage src={NPay} alt="네이버페이" />
            네이버페이
          </PayText>
        </PayOption>
        <PayOption>
          <StyledCheck type="checkbox" />
          <PayText>
            <PayImage src={KakaoPay} alt="카카오페이" /> 카카오페이
          </PayText>
        </PayOption>
      </PayWrap>
      <Guide>
        <GuideText>
          [이용안내]
          <br />
          빵긋빵굿에서 판매되는 상품을 이용하기 위해서는 만 14세 이상
          이용자이어야 하며, 개인정보 제공에 동의해야 합니다.
          <br />
          <br />
          <strong>위 내용을 확인하였으며 결제에 동의합니다.</strong>
        </GuideText>
      </Guide>
      <ButtonContainer>
        <YellowBtn
          txt="결제하기"
          width={"85%"}
          position={"relative"}
          zIndex={"2"}
        />
      </ButtonContainer>
    </>
  );
};

export default Order;

// Styled Components 정의
const DeliveryWrap = styled.div`
  margin: 17px 28px;
`;
const InfoText = styled.div`
  color: var(--brown);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 17px;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const InputBox = styled.div`
  border: 2px solid #d9d9d9;
  border-radius: 5px;
  margin: 0;
  padding: 0;
`;

const StyledInput = styled.input`
  border: 1px solid #d9d9d9;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 0px;
  font-size: 14px;
  outline: none;
`;

const HrDiv = styled.div`
  border-bottom: 1px solid #d9d9d9;
  box-shadow: 0 2px 4px 0 rgba(217, 217, 217, 0.5);
`;

const PayWrap = styled.div`
  margin: 17px 28px 0px 28px;
`;
const PayTitle = styled.div`
  color: var(--brown);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 17px;
`;
const PayOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledCheck = styled.input`
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  margin-right: 0px;

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
      border-width: 0 2px 2px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
`;

const PayImage = styled.img`
  width: auto;
  height: 38px;
  margin-right: 10px;
`;

const PayText = styled.div`
  margin-left: 10px;
  color: var(--grey);
  display: flex;
  align-items: center;
  font-size: 13px;
  letter-spacing: -0.5px;
  line-height: 22px;
  font-weight: 800;
`;
const Guide = styled.div`
  background-color: #f8f8f8;
  padding: 13px 30px;
`;

const GuideText = styled.div`
  font-size: 11px;
  letter-spacing: -0.5px;
  color: #8a8888;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
`;
