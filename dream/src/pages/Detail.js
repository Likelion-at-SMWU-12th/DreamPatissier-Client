import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes, css } from "styled-components";
import ShopIcon from "../assets/shoppingcart.svg";
import Footer from "../components/Footer";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productStatus, setProductStatus] = useState("loading");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 제품 정보와 리뷰를 가져오기
    axios
      .get(`http://127.0.0.1:8000/bakery/product/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setProduct(response.data);
        setProductStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch product details", error);
        setProductStatus("error");
      });
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  // 장바구니에 상품을 추가하는 함수
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://127.0.0.1:8000/bakery/${id}/add-to-cart/`,
        {}, // 필요한 데이터가 있으면 여기에 추가
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 4000);
      })
      .catch((error) => {
        console.error("Failed to add product to cart", error);
      });
  };

  if (productStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (productStatus === "error" || !product) {
    return <div>제품 정보를 불러오지 못했습니다.</div>;
  }

  const reviews = product.reviews || [];
  const tagsArray = product.tags
    ? product.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <>
      <ImgBox>
        <BreadImg src={product.img_src} alt={product.name} />
      </ImgBox>
      <TitleInfo>
        <Title>{product.name}</Title>
        <Price>{formatPrice(product.price)}원</Price>
      </TitleInfo>
      <Section>
        <SectionTitle>웰니스정보</SectionTitle>
        <Tags>
          {tagsArray.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
        <WellnessInfo>{product.description1 || "정보 없음"}</WellnessInfo>
      </Section>
      <Section>
        <SectionTitle>상품정보</SectionTitle>
        <Info>{product.description2 || "정보 없음"}</Info>
      </Section>
      <Section>
        <SectionTitle>상품구성</SectionTitle>
        <Info>{product.description3 || "정보 없음"}</Info>
      </Section>
      <Section>
        <SectionTitle>리뷰</SectionTitle>
        {reviews.length === 0 ? (
          <div>리뷰가 없습니다..</div>
        ) : (
          reviews.map((review, index) => (
            <ReviewBox key={index}>
              <GoodBad>
                {review.satisfaction === "S" ? "만족해요" : "별로예요"}
              </GoodBad>
              <WriterInfo>
                <Writer>{`${review.user.username.slice(0, 3)}****`}</Writer>{" "}
                <ReviewDate>
                  {new Date(review.created_at).toLocaleDateString()}
                </ReviewDate>
              </WriterInfo>
              <ReviewText>{review.content}</ReviewText>
              {index < reviews.length - 1 && <HrDiv />}
            </ReviewBox>
          ))
        )}
      </Section>
      <CartButton onClick={handleAddToCart}>
        <Icon src={ShopIcon} alt="장바구니 아이콘" />
        <ShopText>장바구니</ShopText>
      </CartButton>
      {showPopup && (
        <PopWrap showPopup={showPopup}>
          <CartPop>
            <PopText>장바구니에 상품을 담았어요</PopText>
            <GoBtn onClick={() => navigate("/cart")}>바로가기 &gt;</GoBtn>
          </CartPop>
        </PopWrap>
      )}
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

const BreadImg = styled.img`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

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

const ReviewDate = styled.div`
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

// 팝업 애니메이션 정의
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// 팝업
const PopWrap = styled.div`
  justify-content: center;
  display: flex;
  position: fixed;
  right: 0;
  left: 10%;
  bottom: 5%;
  z-index: 4;
  width: 80%;
  animation: ${(props) =>
    props.showPopup
      ? css`
          ${fadeOut} 5s forwards
        `
      : "none"};
`;

const CartPop = styled.div`
  background-color: var(--yellow);
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 46px;
  display: flex;
  padding: 0px 19px;
`;

const PopText = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: var(--brown);
`;

const GoBtn = styled.button`
  font-size: 15px;
  font-weight: 800;
  color: var(--brown);
  border: none;
  background-color: var(--yellow);
  cursor: pointer;
`;

export default Detail;
