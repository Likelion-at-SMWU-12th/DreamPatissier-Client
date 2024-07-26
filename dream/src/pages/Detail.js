import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import styled from "styled-components";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log("Fetching product details for id:", id);
    axios
      .get(`/product.json`)
      .then((response) => {
        const foundProduct = response.data.find(
          (product) => product.id === parseInt(id)
        );
        console.log("Fetched product details:", foundProduct);
        setProduct(foundProduct);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch product details", error);
        setStatus("error");
      });
  }, [id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || !product) {
    return <div>제품 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <Container>
      <CartButton>장바구니</CartButton>
      <ImgBox>
        <img src={product.imgSrc} alt={product.title} />
      </ImgBox>
      <TitleInfo>
        <h1>{product.title}</h1>
        <p>{product.price}원</p>
      </TitleInfo>
      <Section>
        <SectionTitle>웰니스정보</SectionTitle>
        <Tags>
          {product.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
        <p>방부제와 밀가루 ZERO의 저탄건지 베이커리입니다.</p>
      </Section>
      <Section>
        <SectionTitle>상품정보</SectionTitle>
        <Info>
          식단 관리에서 중요한 점은 칼로리가 아닌 영양성분입니다. 대부분 건강한
          라이프 스타일을 생각하자마자 지방을 기피하기 시작하지만, 오히려 건강한
          지방을 섭취하는 것은 지속 가능한 식단에 도움이 됩니다. 그래서 카토라의
          오레오 크림 치즈케이크는 방부제와 합성료, 밀가루를 첨가하지 않고
          저당과 건강한 지방의 완벽한 영양성분으로 건강한 베이커리를 제공합니다.
          적은 설탕과 자연 감미료로 만든 당류 2g으로 걱정 없이 달콤한 오레오
          크림 치즈케이크를 만나보세요.
        </Info>
      </Section>
      <Section>
        <SectionTitle>상품구성</SectionTitle>
        <p>판매하는 상품의 구성은 오레오 크림 치즈케이크 1개입니다.</p>
      </Section>
      <Section>
        <SectionTitle>리뷰</SectionTitle>
        <p>리뷰 섹션</p>
      </Section>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const CartButton = styled.button`
  position: fixed;
  right: 10%;
  bottom: 10%;
  z-index: 1000;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 90%;
  }
`;

const TitleInfo = styled.div`
  h1 {
    font-size: 24px;
    margin: 10px 0;
  }
  p {
    font-size: 18px;
    color: #555;
  }
`;

const Section = styled.div`
  margin: 20px 0;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  margin-bottom: 10px;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #f0f0f0;
  color: #555;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 3px;
`;

const Info = styled.p`
  font-size: 16px;
  color: #333;
`;

export default Detail;
