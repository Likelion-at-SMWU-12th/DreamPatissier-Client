import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Category = ({ imgSrc, name, uiName }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/bakery/${name}`);
  };

  return (
    <CategoryWrap>
      <CategoryBox onClick={handleCategoryClick}>
        <CategoryImg src={imgSrc} alt={uiName} />
        <CategoryName>{uiName}</CategoryName>
      </CategoryBox>
    </CategoryWrap>
  );
};

export default Category;

const CategoryWrap = styled.div``;

const CategoryBox = styled.button`
  border: none;
  background-color: pink;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const CategoryImg = styled.img`
  width: 100%;
  height: auto;
`;

const CategoryName = styled.div`
  font-size: 11px;
  font-weight: 1000;
  letter-spacing: -0.5px;
  margin-top: 5px;
`;
