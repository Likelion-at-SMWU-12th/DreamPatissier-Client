import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Result = () => {
  const { resultId } = useParams(); // 결과 ID를 URL 파라미터에서 가져옴
  const [resultData, setResultData] = useState(null);

  // 결과 데이터 불러오기
  useEffect(() => {
    axios
      .get(`/test/result/${resultId}`) // 결과 ID를 사용하여 데이터 불러오기
      .then((response) => setResultData(response.data))
      .catch((error) => console.error(error));
  }, [resultId]);

  if (!resultData) return <div>Loading...</div>;

  return (
    <ResultWrap>
      <TitleBox>
        <Styledh1>{resultData.title}</Styledh1>
      </TitleBox>
      <TypeImg>
        <img src={resultData.img} alt="result" />
      </TypeImg>
      <TypeText>
        <div>{resultData.description}</div>
      </TypeText>
      <TypeProduct>
        <ul>
          {resultData.recommend.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </TypeProduct>
    </ResultWrap>
  );
};

export default Result;

const ResultWrap = styled.div``;
const TitleBox = styled.div``;
const Styledh1 = styled.h1``;
const TypeImg = styled.div``;
const TypeText = styled.div``;
const TypeProduct = styled.div``;
