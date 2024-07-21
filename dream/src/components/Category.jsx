import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Category = ({ imgSrc, category_name }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/bakery/${category_name}`);
  };

  return (
    <CategoryBox onClick={handleCategoryClick}>
      <CategoryImg src={imgSrc} alt={category_name} />
      <CategoryName>{category_name}</CategoryName>
    </CategoryBox>
  );
};

export default Category;

const CategoryBox = styled.button`
  border: none;
  background-color: pink;
  border-radius: 10px;
  padding: 10px 10px;
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
  width: 90%;
  height: auto;
`;

const CategoryName = styled.span`
  margin-top: 10px;
  display: block;
`;
