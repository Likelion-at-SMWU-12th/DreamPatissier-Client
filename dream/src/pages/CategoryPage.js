import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Product from "../components/Product";
import Warning from "../assets/warning.png";

const CategoryPage = () => {
  const { categoryName } = useParams(); // URL에서 categoryName을 가져옴
  const [products, setProducts] = useState([]); // 제품 목록을 저장할 상태
  const [status, setStatus] = useState("loading"); // 데이터 로딩 및 오류 상태

  useEffect(() => {
    console.log(`Fetching products for category: ${categoryName}`);
    const token = localStorage.getItem("token"); // 로컬스토리지에서 토큰을 가져옴

    // 카테고리별 제품 목록을 API에서 가져옴
    axios

      .get(`http://127.0.0.1:8000/bakery/category/${categoryName}/`, {
        headers: {
          Authorization: `Token ${token}`, // 헤더에 토큰을 추가
        },
      })
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data); // 응답 데이터를 상태에 저장
        setStatus("success"); // 데이터 로딩 성공
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setStatus("error"); // 데이터 로딩 오류
      });
  }, [categoryName]); // categoryName이 변경될 때마다 useEffect 호출

  // 로딩 중인 경우
  if (status === "loading") {
    return (
      <MsgBox>
        <Message>Loading...</Message>
      </MsgBox>
    );
  }

  // 오류가 발생한 경우
  if (status === "error") {
    return (
      <MsgBox>
        <Message>제품을 못불러와버렸다...</Message>
      </MsgBox>
    );
  }

  // 제품 목록이 비어있는 경우
  if (products.length === 0) {
    return (
      <MsgBox>
        <WarningImg src={Warning} />
        <Message>
          검색하신 키워드의 빵이 없습니다. <br />
          다른 웰니스 키워드를 검색해 주세요.
        </Message>
      </MsgBox>
    );
  }

  return (
    <ProductWrap>
      {products.map((product) => (
        <StyledLink to={`/bakery/product/${product.id}`} key={product.id}>
          <Product
            imgSrc={product.imgSrc}
            tags={product.tags}
            title={product.title}
            price={product.price}
          />
        </StyledLink>
      ))}
    </ProductWrap>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const MsgBox = styled.div`
  width: 100%;
  margin: 30px 0px;
  text-align: center;
`;

const Message = styled.div`
  text-align: center;
  font-size: 14px;
  color: #979797;
  font-family: "Noto Sans KR";
  font-weight: medium;
  padding-bottom: 10px;
`;

const WarningImg = styled.img`
  width: 54px;
  height: auto;
  margin-bottom: 15px;
`;

const ProductWrap = styled.div`
  margin: 0px 25px;
  display: grid;
  grid-template-columns: repeat(2, 47vw);
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

export default CategoryPage;
