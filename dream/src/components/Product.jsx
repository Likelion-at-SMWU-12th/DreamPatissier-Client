import React from "react";
import styled from "styled-components";

const Product = ({ imgSrc, tags, title, price }) => {
  return (
    <ProductBox>
      <ProductImgBox>
        <ProductImg src={imgSrc} />
      </ProductImgBox>
      <ProductText>
        <Keywords>{tags}</Keywords>
        <Titles>{title}</Titles>
        <Prices>{price}원</Prices>
      </ProductText>
    </ProductBox>
  );
};

export default Product;

const ProductBox = styled.div`
  width: calc(50% - 10px);
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProductImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ProductImg = styled.img`
  width: 100%;
  align-items: center;
  margin: 0;
`;

const ProductText = styled.div`
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Keywords = styled.span`
  color: var(--yellow);
  font-weight: bold;
  font-size: 9px;
`;

const Titles = styled.p`
  color: var(--brown);
  font-size: 11px;
  font-weight: bold;
  margin: 0;
  margin-top: 4px;
`;

const Prices = styled.p`
  font-size: 13px;
  font-weight: bold;
  color: var(--brown);
  margin: 0;
  margin-top: 5px;
`;
