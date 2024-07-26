import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Product from "../components/Product";
import Warning from "../assets/warning.png";

const SearchPage = () => {
  const { tags } = useParams();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0);

    axios
      .get("/product.json")
      .then((response) => {
        const filteredProducts = response.data.filter((product) => {
          const lowerCaseTags = product.tags.map((tag) => tag.toLowerCase());
          return tagArray.some((tag) =>
            lowerCaseTags.some((productTag) => productTag.includes(tag))
          );
        });
        setProducts(filteredProducts);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setStatus("error");
      });
  }, [tags]);

  if (status === "loading") {
    return (
      <MsgBox>
        <Message>Loading...</Message>
      </MsgBox>
    );
  }

  if (status === "error") {
    return (
      <MsgBox>
        <Message>제품을 못불러와버렸다...</Message>
      </MsgBox>
    );
  }

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
        <StyledLink to={`/product/${product.id}`} key={product.id}>
          <Product
            key={product.id}
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

export default SearchPage;

// 스타일 정의
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
  margin: 0 25px;
  display: grid;
  grid-template-columns: repeat(2, 47vw);
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;
