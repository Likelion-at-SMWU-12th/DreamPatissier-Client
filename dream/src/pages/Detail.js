import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import styled from "styled-components";
import ShopIcon from "../assets/shoppingcart.svg";
// import Review from "./userpage/Review";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get("/product.json")
      .then((response) => {
        const foundProduct = response.data.find(
          (product) => product.id === parseInt(id)
        );
        setProduct(foundProduct);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch product details", error);
        setStatus("error");
      });
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || !product) {
    return <div>제품 정보를 불러오지 못했습니다.</div>;
  }

  return (
    <>
      <ImgBox>
        <img src={product.imgSrc} alt={product.title} />
      </ImgBox>
      <TitleInfo>
        <Title>{product.title}</Title>
        <Price> {formatPrice(product.price)}원</Price>
      </TitleInfo>
      <Section>
        <SectionTitle>웰니스정보</SectionTitle>
        <Tags>
          {product.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
        <WellnessInfo>
          아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.
        </WellnessInfo>
      </Section>
      <Section>
        <SectionTitle>상품정보</SectionTitle>
        <Info>
          아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이
          안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이 안됐슴니다. 왜냐면
          아직 못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직
          못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직
          연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이 안됐슴니다.
          왜냐면 아직 못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직
          못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직
          연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이 안됐슴니다.
          왜냐면 아직 못했으니까요.
        </Info>
      </Section>
      <Section>
        <SectionTitle>상품구성</SectionTitle>
        <Info>아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.</Info>
      </Section>
      <Section>
        <SectionTitle>리뷰</SectionTitle>
        <ReviewBox>
          <GoodBad>만족해요</GoodBad>
          <WriterInfo>
            <Writer>빵**</Writer>|<Date>2024.07.19</Date>
          </WriterInfo>
          <ReviewText>
            아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이
            안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이 안됐슴니다. 왜냐면
            아직 못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직
            못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직
            연동이 안됐슴니다. 왜냐면 아직 못했으니까요.
          </ReviewText>
        </ReviewBox>
        <HrDiv />
        <ReviewBox>
          <GoodBad>만족해요</GoodBad>
          <WriterInfo>
            <Writer>빵**</Writer>|<Date>2024.07.19</Date>
          </WriterInfo>
          <ReviewText>
            아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이
            안됐슴니다. 왜냐면 아직 못했으니까요.아직 연동이 안됐슴니다. 왜냐면
            아직 못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직
            못했으니까요.아직 연동이 안됐슴니다. 왜냐면 아직 못했으니까요.아직
            연동이 안됐슴니다. 왜냐면 아직 못했으니까요.
          </ReviewText>
        </ReviewBox>
      </Section>
      <CartButton>
        <Icon src={ShopIcon} alt="장바구니 아이콘" />
        <ShopText>장바구니</ShopText>
      </CartButton>
      <Footer />
    </>
  );
};

// 스타일
// 장바구니 버튼
const CartButton = styled.button`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
  padding: 10px 10px;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  border: var(--brown) 1px solid;
  border-radius: 17px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 17px;
  margin-bottom: -3px;
  margin-right: 2px;
`;

const ShopText = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: var(--brown);
  display: inline-block;
`;

// 이미지 섹션
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-bottom: 20px;
  img {
    width: 90%;
  }
`;

// 가격&빵이름
const TitleInfo = styled.div`
  box-shadow: 0 2px 4px 0 rgba(217, 217, 217, 0.5);
  border-bottom: 1px solid #d9d9d9;
  padding-left: 25px;
  padding-bottom: 20px;
  margin-bottom: 17px;
`;

const Title = styled.div`
  font-size: 16px;
  color: var(--brown);
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 6px;
`;
const Price = styled.div`
  font-size: 22px;
  color: var(--brown);
  font-weight: 800;
  letter-spacing: -0.5px;
`;

// 각 섹션 공통 스타일
const Section = styled.div`
  width: 90%;
  margin-bottom: 25px;
  margin-left: 27px;
`;

const SectionTitle = styled.div`
  font-size: 17px;
  letter-spacing: -0.5px;
  line-height: 22px;
  font-weight: 800;
  margin-bottom: 3px;
  border-bottom: 1.5px solid var(--yellow);
  width: auto;
  color: var(--brown);
  display: inline-block;
`;

//태그 관련
const Tags = styled.div`
  margin-bottom: 4px;
`;

const Tag = styled.div`
  display: inline-block;
  margin-right: 5px;
  color: var(--yellow);
  font-weight: 800;
  letter-spacing: -0.5px;
  font-size: 12px;
`;

//설명칸
const WellnessInfo = styled.div`
  font-size: 14px;
  letter-spacing: -0.5px;
  word-break: keep-all;
`;

const Info = styled.div`
  margin-top: 3px;
  font-size: 14px;
  letter-spacing: -0.5px;
  word-break: keep-all;
`;

//리뷰 섹션
const ReviewBox = styled.div`
  margin-top: 15px;
`;

const GoodBad = styled.div`
  font-size: 15px;
  letter-spacing: 1%;
  font-weight: 800;
`;
const WriterInfo = styled.div`
  color: #979797;
  font-size: 14px;
  letter-spacing: 1%;
  margin-top: 5px;
`;

const Writer = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

const Date = styled.div`
  display: inline-block;
  margin-left: 5px;
`;

const ReviewText = styled.div`
  font-size: 14px;
  letter-spacing: -0.5px;
  margin-top: 5px;
  word-break: keep-all;
`;

const HrDiv = styled.div`
  margin-top: 15px;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  box-shadow: 0 2px 4px 0 rgba(217, 217, 217, 0.5);
`;

export default Detail;
