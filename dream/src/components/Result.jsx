import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import YellowBtn from "./YellowBtn";
import LogoIcon from "../assets/logoIcon.svg";

const Result = ({ resultsData }) => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const result = resultsData.find((r) => r.id.toString() === resultId);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    if (result && result.recommend) {
      axios
        .get("/product.json")
        .then((response) => {
          const recommended = response.data.filter((product) =>
            result.recommend.includes(product.id)
          );
          setRecommendedProducts(
            recommended.sort(() => 0.5 - Math.random()).slice(0, 2)
          );
        })
        .catch((error) => {
          console.error("Error fetching recommended products", error);
        });
    }
  }, [result]);

  if (!result) {
    return <div>결과를 찾을 수 없습니다.</div>;
  }

  return (
    <ResultWrap>
      <TitleBox>
        <Styledh1>{result.title}</Styledh1>
      </TitleBox>
      <TypeImgBox>
        <TypeImg src={result.img} alt="result" />
      </TypeImgBox>
      <TypeTextBox>
        <Text>
          <Text1>{result.description1}</Text1>
          <br />
          <Text2>{result.description2}</Text2>
          <br />
          <Text3>{result.description3}</Text3>
        </Text>
      </TypeTextBox>
      <RecommendTitle>
        <BngImg src={LogoIcon} alt="logo" />
        빵긋빵굿의 추천빵
        <BngImg src={LogoIcon} alt="logo" />
      </RecommendTitle>
      <TypeProductWrap>
        {recommendedProducts.map((item, index) => (
          <StyledLink to={`/bakery/product/${item.id}`} key={item.id}>
            <ProductBox>
              <ProductImg src={item.imgSrc} alt={item.title} />
              <ProductText>
                <Titles>{item.title}</Titles>
                <Keywords>
                  {item.tags.map((tag, idx) => (
                    <Tag key={idx}>{tag}</Tag>
                  ))}
                </Keywords>
              </ProductText>
            </ProductBox>
          </StyledLink>
        ))}
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

// 스타일 정의
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
  width: 80%;
  height: auto;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
  padding: 20px 10px;
`;

const Text = styled.div`
  font-size: 17px;
  letter-spacing: -0.41px;
  font-family: "Noto Sans KR";
  font-weight: regular;
  width: 80%;
  height: auto;
  box-sizing: border-box;
  word-break: keep-all;
  margin: auto;
  color: #311505;
`;

const Text1 = styled.div``;

const Text2 = styled.div``;

const Text3 = styled.div``;

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
  text-align: left;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;
