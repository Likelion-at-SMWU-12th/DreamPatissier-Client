import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #f3f3f3;
`;

const ProgressBarFill = styled.div`
  width: ${(props) => props.progress}%;
  background-color: #4caf50;
  height: 20px;
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
