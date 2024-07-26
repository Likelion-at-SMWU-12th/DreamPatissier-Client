import React from "react";
import styled from "styled-components";

const Product = ({ id, imgSrc, tags, title, price, description }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  return (
    <ProductBox>
      <ProductImgBox>
        <ProductImg src={imgSrc} />
      </ProductImgBox>
      <ProductText>
        <Keywords>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Keywords>
        <Titles>{title}</Titles>
        <Prices>{formatPrice(price)}원</Prices>
      </ProductText>
    </ProductBox>
  );
};

export default Product;

const ProductBox = styled.div`
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
  padding-left: 5px;
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  margin: 5px 0px;
`;

const Tag = styled.span`
  color: var(--yellow);
  font-weight: 800;
  font-size: 9px;
`;

const Titles = styled.p`
  color: var(--brown);
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  margin-top: 4px;
`;

const Prices = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: var(--brown);
  margin: 0;
  margin-top: 5px;
`;
