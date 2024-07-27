import React from "react";
import styled from "styled-components";
import YellowBtn from "../components/YellowBtn";

const Order = () => {
  return (
    <>
      <DeliveryWrap>
        배송지 인풋 섹션
        <InfoText>배송지 정보</InfoText>
        <Inputwrap>
          <StyledInput placeholder="받는 분" type="text" />
          <StyledInput placeholder="우편번호" type="text" />
          <StyledInput placeholder="상세 주소" type="text" />
          <StyledInput placeholder="연락처" type="text" />
        </Inputwrap>
      </DeliveryWrap>
      <PayWrap>
        결제수단 섹션
        <input type="checkbox"></input>
        <div>토스페이 이미지, 토스페이</div>
        <input type="checkbox"></input>
        <div>네이버페이 이미지, 네이버</div>
        <input type="checkbox"></input>
        <div>카카오페이 이미지, 카카오페이</div>
      </PayWrap>
      <Guide>이용안내 섹션</Guide>
      <YellowBtn txt="결제하기" />
    </>
  );
};

export default Order;

const DeliveryWrap = styled.div``;
const InfoText = styled.div``;
const Inputwrap = styled.div``;
const StyledInput = styled.input``;
const PayWrap = styled.div``;
const Guide = styled.div``;
