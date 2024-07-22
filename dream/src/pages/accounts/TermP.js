import React from "react";
import styled from "styled-components";
import Cancel from "../../assets/cancel.svg";

const TermP = () => {
  return (
    <>
      <Bar>
        <Title>회원가입</Title>
        <CancelIcon src={Cancel} />
      </Bar>
      <TermsWrap>
        「개인정보 보호법」제 15조 법규에 의거하여 , 서비스(이하 "회사"라
        한다)는 이용자의 개인정보 수집 및 활용에 대해 개인정보 수집 및 이용
        동의서를 받고 있습니다. 개인정보 제공자가 동의한 내용 외의 다른 목적으로
        활용하지 않으며, 제공된 개인정보의 이용을 거부하고자 할 때에는 개인정보
        관리 책임자를 통해 열람, 정정 혹은 삭제를 요구할 수 있습니다. 제공된
        개인정보는 회사의 아래 항목에 제한된 범위 내에서만 활용됩니다. 1.
        개인정보의 제공 목적 - 계약의 체결º 유지º 이행º 관리 - 개인식별º
        본인확인º부정사용방지 등 회원관리, 본 서비스 및 부가/제휴서비스 제공,
        배송, 비용의 결제 등 개인(신용)정보 제공 항목 - 개인의 성명, 성별,
        생년월일, 휴대폰번호 - 기타 계약의 체결, 유지, 이행, 관리 등과 관련하여
        본인이 제공한 정보 개인(신용)정보를 제공받는 자 - 서비스 제공받는 자의
        개인정보 보유 및 이용기간 - 위 개인정보의 수집 및 이용 동의일로부터
        목적을 달성할 때까지 보유/이용하게 됩니다.(단, 정보통신망 이용촉진 및
        정보보호에 관한 법률 등 타 법률에서 보존할 필요가 있는 경우 일정기간
        보관하게 됩니다.) 가. 계약 또는 청약철회 등에 관한 기록 : 5년(전자상거래
        등에서의 소비자보호에 관한 법률) 나. 대금결제 및 재화 등의 공급에 관한
        기록 : 5년(전자상거래 등에서의 소비자보호에 관한 법률) 다. 소비자의 불만
        또는 분쟁처리에 관한 기록 : 3년(전자상거래 등에서의 소비자보호에 관한
        법률) ※ 위 사항에 대해 동의를 거부할 수 있으나, 본 동의 내용은 필수
        동의항목으로 거부 시 서비스 가입 또는 유지, 거래인증 및 부정사용 예방 및
        관리 등이 불가능합니다. 상기 내용이 변동되는 경우 인터넷 홈페이지 게시
        및 서비스의 공지사항 등을 통하여 그 내용을 안내하여 드립니다.
      </TermsWrap>
    </>
  );
};
export default TermP;

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

const TermsWrap = styled.div`
  background-color: red;
`;
