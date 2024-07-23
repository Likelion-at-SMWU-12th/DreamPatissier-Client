import React from "react";
import styled from "styled-components";

const ProgressBar = ({ current, total }) => (
  <ProWrap>
    <BarBox>
      <Bar
        style={{
          width: `${(current / total) * 100}%`,
        }}
      ></Bar>
      <Numb>{`${current + 1}/${total}`}</Numb>
    </BarBox>
  </ProWrap>
);

export default ProgressBar;

const ProWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 40px 0;
`;

const Numb = styled.span`
  position: absolute;
  right: 10px;
  top: -20px;
  font-size: 12px;
  color: var(--brown);
`;

const BarBox = styled.div`
  width: 80%;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 5px;
  height: 10px;
`;

const Bar = styled.div`
  height: 100%;
  background-color: var(--yellow);
  border-radius: 5px;
`;
