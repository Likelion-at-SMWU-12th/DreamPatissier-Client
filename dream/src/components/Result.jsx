import React, { useEffect, useState } from "react";
// import axios from "axios";
import styled from "styled-components";
// import { useParams } from "react-router-dom";
import Testplain from "../assets/test-plain.png";
import logoIcon from "../assets/logoIcon.svg";
import YellowBtn from "./YellowBtn";
import { useNavigate } from "react-router-dom";
import PlantBread from "../assets/TE-plant.png";

const Result = () => {
  const navigate = useNavigate();

  return (
    <ResultWrap>
      <TitleBox>
        <Styledh1>{/*{resultData.title}*/}폭신한 인기쟁이 식빵</Styledh1>
      </TitleBox>
      <TypeImgBox>
        {/*<img src={resultData.img} alt="result" />*/}
        <TypeImg src={Testplain} />
      </TypeImgBox>
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
      <RecommendTitle>
        <BngImg src={logoIcon} />
        빵긋빵굿의 추천빵 <BngImg src={logoIcon} />
      </RecommendTitle>
      <TypeProductWrap>
        <ProductBox /* 나중에  navigate 넣기... */>
          <ProductImg src={PlantBread} />
          <ProductText>
            <Titles>[몽블렁제] 식물성 식빵</Titles>
            <Keywords>
              <Tag>#식물성 #프로틴</Tag>
            </Keywords>
          </ProductText>
        </ProductBox>
        <ProductBox /* 나중에  navigate 넣기... */>
          <ProductImg src={PlantBread} />
          <ProductText>
            <Titles>[몽블렁제] 식물성 식빵</Titles>
            <Keywords>
              <Tag>#식물성 #프로틴</Tag>
            </Keywords>
          </ProductText>
        </ProductBox>
        {/*
        <ul>
          {resultData.recommend.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>*/}
      </TypeProductWrap>
      <ButtonWrap>
        <YellowBtn
          width={"338px"}
          txt="빵 유형 테스트 다시 하기"
          onBtnClick={() => navigate("/test/questions/1")}
        />
        <YellowBtn
          width={"338px"}
          txt="메인화면으로 이동하기"
          backgroundColor={"white"}
          border={"1px solid #471D06"}
          onBtnClick={() => navigate("/bakery")}
        />
      </ButtonWrap>
    </ResultWrap>
  );
};

export default Result;

const ResultWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const Styledh1 = styled.p`
  font-family: "Noto Sans KR";
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
  color: #311505;
  margin: 0px;
`;
const TypeImgBox = styled.div`
  padding: 45px;
  display: flex;
  justify-content: center;
`;
const TypeImg = styled.img`
  width: 181px;
  height: auto;
`;
const TypeTextBox = styled.div`
  background-color: #ffecc4;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 338px;
  height: 260px;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
`;
const Text = styled.div`
  font-size: 17px;
  letter-spacing: -0.41px;
  font-family: "Noto Sans KR";
  font-weight: regular;
  width: 295px;
  height: auto;
  box-sizing: border-box;
  word-break: keep-all;
  margin: auto;
  color: #311505;
`;
const RecommendTitle = styled.div`
  font-size: 19px;
  letter-spacing: 1px;
  font-family: "Noto Sans KR";
  font-weight: Bold;
  width: 100%;
  display: flex;
  justify-content: center;
  color: #311505;
  margin-top: 54px;
  margin-bottom: 30px;
`;

const BngImg = styled.img`
  width: 28px;
  height: 25px;
  margin: 0px 5px;
`;

const TypeProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 338px;
  margin-bottom: 50px;
`;

const ProductBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 96px;
  height: auto;
  margin-right: 20px;
`;

const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Titles = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: var(--brown);
  margin: 0;
  letter-spacing: -0.5px;
`;

const Keywords = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
`;

const Tag = styled.span`
  font-size: 12px;
  color: #ffb415;
  font-weight: bold;
  letter-spacing: -0.5px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  align-items: center;
  margin-bottom: 100px;
`;
