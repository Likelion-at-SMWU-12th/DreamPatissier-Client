import React from "react";
import styled from "styled-components";

const Question = ({ q, a, onOptionClick }) => (
  <Container>
    <Qbox>
      <Q dangerouslySetInnerHTML={{ __html: q }} />
    </Qbox>
    <ButtonBox>
      {a.map((option, index) => (
        <Button
          key={index}
          onClick={() => onOptionClick(option.type)}
          dangerouslySetInnerHTML={{ __html: option.text }}
        />
      ))}
    </ButtonBox>
  </Container>
);

export default Question;

const Container = styled.div`
  text-align: center;
  justify-content: center;
`;

const Qbox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
`;

const Q = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 800;
  font-size: 20px;
  text-align: center;
`;

const Button = styled.button`
  margin: 15px auto;
  width: 310px;
  height: 60px;
  border: 1px solid var(--brown);
  background-color: white;
  border-radius: 50px;
  cursor: pointer;
  font-size: 11px;
  color: var(--brown);
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  white-space: pre-wrap; /* Ensure line breaks are respected */
  padding: 20px;

  &:hover {
    background-color: var(--yellow);
    border: 1px solid var(--yellow);
  }
`;

const ButtonBox = styled.div`
  margin-bottom: 100px;
`;
