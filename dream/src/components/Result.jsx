import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import YellowBtn from "./YellowBtn";
import LogoIcon from "../assets/logoIcon.svg";

const Result = ({ resetTest }) => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        const response = await axios.get(`/test/result/${resultId}`);
        console.log("API 응답 데이터:", response.data);
        setResult(response.data);

        // Update local storage if the fetched result is different
        const localResultId = localStorage.getItem("result_id");
        if (localResultId !== resultId) {
          localStorage.setItem("result_id", resultId);
        }

        const products = response.data.breads
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        console.log("추천 빵 데이터:", products);
        setRecommendedProducts(products);
      } catch (error) {
        console.error("결과를 가져오는 중 오류 발생:", error);
      }
    };

    fetchResultData();
  }, [resultId]);

  if (!result) {
    return <div>결과를 찾을 수 없습니다.</div>;
  }

  return (
    <ResultWrap>
      <TitleBox>
        <Styledh1>{result.title}</Styledh1>
      </TitleBox>
      <TypeImgBox>
        <TypeImg src={result.image} alt="result" />
      </TypeImgBox>
      <TypeTextBox>
        <Text>
          {result.description1}
          <br /> <br />
          {result.description2}
          <br /> <br />
          {result.description3}
        </Text>
      </TypeTextBox>
      <RecommendTitle>
        <BngImg src={LogoIcon} alt="logo" />
        빵긋빵굿의 추천빵
        <BngImg src={LogoIcon} alt="logo" />
      </RecommendTitle>
      <TypeProductWrap>
        {recommendedProducts.map((item) => {
          console.log("추천 빵 아이템:", item);
          if (!item.id) {
            console.error("추천 빵 아이템에 ID가 없습니다:", item);
          }
          return (
            <StyledLink to={`/bakery/product/${item.id}`} key={item.id}>
              <ProductBox>
                <ProductImg src={item.img_src} alt={item.name} />
                <ProductText>
                  <Titles>{item.name}</Titles>
                  <Keywords>
                    {item.tags.split(",").map((tag, idx) => (
                      <Tag key={idx}>{tag.trim()}</Tag>
                    ))}
                  </Keywords>
                </ProductText>
              </ProductBox>
            </StyledLink>
          );
        })}
      </TypeProductWrap>
      <ButtonWrap>
        <YellowBtn
          width={"338px"}
          txt="빵 유형 테스트 다시 하기"
          onBtnClick={resetTest}
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
  width: 85%;
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
