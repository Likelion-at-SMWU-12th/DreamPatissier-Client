import React from "react";
import styled from "styled-components";

const Product = ({ imgSrc, tags, title, price }) => {
  return (
    <ProductBox>
      <img src={imgSrc} />
      <div>
        <span>{tags}</span>
        <span>{tags}</span>
        <p>{title}</p>
        <p>{price}</p>
      </div>
    </ProductBox>
  );
};

export default Product;

const ProductBox = styled.div`
  width: 30%;
  background-color: white;
`;
