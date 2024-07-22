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
      .get(`http://127.0.0.1:8000/bakery/${categoryName}/`)
      .then((response) => {
        setProducts(response.data); // 제품 목록을 상태에 저장
        setStatus("success"); // 데이터 로딩 성공
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setStatus("error"); // 데이터 로딩 오류
      });
  }, [categoryName]); // categoryName이 변경될 때마다 useEffect 호출

  if (status === "loading") {
    return <Message>Loading...</Message>;
  }

  if (status === "error") {
    return <Message>제품을 못불러와버렸다...</Message>;
  }

  return (
    <ProductList>
      {products.length > 0 ? (
        products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <Product
              imgSrc={product.imgSrc}
              tags={product.tags}
              title={product.title}
              price={product.price}
            />
          </Link>
        ))
      ) : (
        <Message>해당 카테고리에 상품이 없습니다.</Message>
      )}
    </ProductList>
  );
};

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5%;
`;

const Message = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #999;
`;

export default CategoryPage;
