import React from "react";
import styled from "styled-components";

const Button = ({ txt, onBtnClick, fontSize }) => {
  return (
    <ButtonBox onClick={onBtnClick} fontSize={fontSize}>
      {txt || "버튼"}
    </ButtonBox>
  );
};

export default Button;

const ButtonBox = styled.button`
  padding: 15px 40px;
  background-color: #2a2a2a;
  border-radius: 30px;
  border: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "20px"};
  &:hover {
    background-color: #f0873e;
  }
`;
