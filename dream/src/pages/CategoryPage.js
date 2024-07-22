import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Product from "../components/Product";

const CategoryPage = () => {
  const { categoryName } = useParams(); // URL에서 categoryName을 가져옴
  const [products, setProducts] = useState([]); // 제품 목록을 저장할 상태
  const [status, setStatus] = useState("loading"); // 데이터 로딩 및 오류 상태

  useEffect(() => {
    // 카테고리별 제품 목록을 API에서 가져옴
    axios
      .get("/product.json")
      // .get(`http://127.0.0.1:8000/bakery/${categoryName}/`)
      .then((response) => {
        // 카테고리별로 제품을 필터링함
        const filteredProducts = response.data.filter(
          (product) => product.categoryName === categoryName
        );
        setProducts(filteredProducts); // 필터링된 제품 목록을 상태에 저장
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
        <Message>
          ˚₊*̥⸜ 🍞 굽는 중 ⋆*‧˚₊*̥
          <br />
          해당 카테고리 상품을 준비중이에요.
        </Message>
      </MsgBox>
    );
  }

  // 제품 목록이 있는 경우
  return (
    <ProductBox>
      {products.map((product) => (
        <StyledLink to={`/product/${product.id}`} key={product.id}>
          <Product
            imgSrc={product.imgSrc}
            tags={product.tags}
            title={product.title}
            price={product.price}
          />
        </StyledLink>
      ))}
    </ProductBox>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Message = styled.div`
  text-align: center;
  font-size: 18px;
  color: #999;
`;

const MsgBox = styled.div`
  width: 100%;
  margin: 100px 0px;
`;

const ProductBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5%;
`;

export default CategoryPage;
