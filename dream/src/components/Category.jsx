import React from "react";
import styled from "styled-components";
import baguette from "../assets/baguette.png";

const Category = ({ categories, onCategoryClick }) => {
  return (
    <CategoryWrapper>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          onClick={() => onCategoryClick(category)}
        >
          <CategoryImage src={category.imgSrc} alt={category.name} />
        </CategoryButton>
      ))}
    </CategoryWrapper>
  );
};

export default Category;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  border: none;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const CategoryImage = styled.img``;
