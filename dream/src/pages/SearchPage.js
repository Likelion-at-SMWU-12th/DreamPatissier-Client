import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Product from "../components/Product";

const SearchPage = () => {
  const { tags } = useParams();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    axios
      .get("/product.json")
      .then((response) => {
        const filteredProducts = response.data.filter((product) => {
          const lowerCaseTags = product.tags.map((tag) => tag.toLowerCase());
          const lowerCaseTitle = product.title.toLowerCase();
          return tagArray.some(
            (tag) =>
              lowerCaseTags.some((productTag) =>
                productTag.includes(tag.toLowerCase())
              ) || lowerCaseTitle.includes(tag.toLowerCase())
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
        <Message>
          ˚₊*̥⸜ 🍞 굽는 중 ⋆*‧˚₊*̥
          <br />
          해당 상품을 준비중이에요.
        </Message>
      </MsgBox>
    );
  }

  return (
    <ProductWrap>
      {products.map((product) => (
        <Product
          key={product.id}
          imgSrc={product.imgSrc}
          tags={product.tags}
          title={product.title}
          price={product.price}
        />
      ))}
    </ProductWrap>
  );
};

export default SearchPage;

// 스타일 정의
const MsgBox = styled.div`
  width: 100%;
  margin: 100px 0px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 18px;
  color: #999;
`;

const ProductWrap = styled.div`
  margin: 0 25px;
  display: grid;
  grid-template-columns: repeat(2, 47vw);
  align-items: center;
  gap: 10px;
  justify-content: center;
`;
