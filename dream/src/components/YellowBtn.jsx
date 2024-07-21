import React from "react";
import styled from "styled-components";

const YellowBtn = ({ txt, onBtnClick, fontSize, type, width }) => {
  return (
    <ButtonBox
      onClick={onBtnClick}
      fontSize={fontSize}
      type={type}
      width={width}
    >
      {txt || "버튼"}
    </ButtonBox>
  );
};

export default YellowBtn;

const ButtonBox = styled.button`
  background-color: #ffbd30;
  width: ${(props) => props.width || "300px"};
  height: 40px;
  border-radius: 5px;
  border: none;
  color: #471d06;
  font-weight: 700;
  box-shadow: 0px 2px 4px 0px #00000040;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "15px"};
`;
