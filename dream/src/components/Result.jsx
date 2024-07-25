import React, { useEffect, useState } from "react";
// import axios from "axios";
import styled from "styled-components";
// import { useParams } from "react-router-dom";
import Testplain from "../assets/test-plain.png";

const Result = () => {
  {
    /* const { resultId } = useParams();
  const [resultData, setResultData] = useState(null);

// 결과 데이터 불러오기
  useEffect(() => {
    axios
      .get(`/test/result/${resultId}`) // 결과 ID를 사용하여 데이터 불러오기
      .then((response) => setResultData(response.data))
      .catch((error) => console.error(error));
  }, [resultId]);

if (!resultData) return <div>Loading...</div>; */
  }

  return (
    <ResultWrap>
      <TitleBox>
        <Styledh1>{/*{resultData.title}*/}폭신한 인기쟁이 식빵</Styledh1>
      </TitleBox>
      <TypeImg>
        {/*<img src={resultData.img} alt="result" />*/}
        <img src={Testplain} />
      </TypeImg>
      <TypeTextBox>
        <Text>
          당신은 소중한 사람에게 애정표현을 아끼지 않는 따뜻한 마음을 가진
          사람입니다.
          <br />
          <br />
          상대방을 배려하는 예쁜 말을 자주 하여 다정한 모습으로 많은 사람들의
          호감을 사곤 합니다.
          <br />
          <br />
          첫인상은 조금 까칠해 보일 수 있지만, 실제로는 속이 여리고 폭신한 인기
          많은 식빵 같은 존재입니다.
          {/*{resultData.description}*/}
        </Text>
      </TypeTextBox>
      <RecommendTitle>빵긋빵굿의 추천빵</RecommendTitle>
      <TypeProduct>
        {/*
        <ul>
          {resultData.recommend.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>*/}
      </TypeProduct>
    </ResultWrap>
  );
};

export default Result;

const ResultWrap = styled.div`
  background-color: cornflowerblue;
  text-align: center;
`;
const TitleBox = styled.div`
  background-color: #194545;
`;
const Styledh1 = styled.p`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1.2px;
`;
const TypeImg = styled.div`
  background-color: darkmagenta;
`;
const TypeTextBox = styled.div`
  background-color: navajowhite;
`;
const TypeProduct = styled.div`
  background-color: azure;
`;
const Text = styled.div`
  background-color: lawngreen;
`;
const RecommendTitle = styled.div`
  background-color: salmon;
`;
