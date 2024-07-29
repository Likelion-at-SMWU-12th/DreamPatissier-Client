import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import timerIcon2 from "../../assets/timer2.png";
import toolIcon2 from "../../assets/tool2.png";
import "../../styles/SavedRecipes.css";
import savedIcon from "../../assets/saved-icon.png";
import unsavedIcon from "../../assets/unsaved-icon.png";
import re_image from "./bread.png";

const SavedRecipes = () => {
  const dummyData = [
    {
      id: 1,
      title: "감바스 알 아히요",
      tags: ["해산물", "스페인 요리", "간편 요리"],
      represent_img: re_image,
      date: "2023-07-01",
      cookingTime: "30분",
      equipment: "전자레인지",
      description: "맛있는 감바스 알 아히요입니다.",
      isSaved: true,
    },
    {
      id: 2,
      title: "마르게리타 피자",
      tags: ["이탈리아 요리", "피자", "베지테리언"],
      represent_img: re_image,
      date: "2023-07-02",
      cookingTime: "30분",
      equipment: "전자레인지",
      description: "클래식한 마르게리타 피자.",
      isSaved: true,
    },
    {
      id: 3,
      title: "감바스 알 아히요",
      tags: ["해산물", "스페인 요리", "간편 요리"],
      represent_img: re_image,
      date: "2023-07-01",
      cookingTime: "30분",
      equipment: "전자레인지",
      description: "맛있는 감바스 알 아히요입니다.",
      isSaved: true,
    },
    {
      id: 4,
      title: "마르게리타 피자",
      tags: ["이탈리아 요리", "피자", "베지테리언"],
      represent_img: re_image,
      date: "2023-07-02",
      cookingTime: "30분",
      equipment: "전자레인지",
      description: "클래식한 마르게리타 피자.",
      isSaved: true,
    },
  ];

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(dummyData);
  }, []);

  const handleDetailRecipe = (id) => {
    navigate(`/recipes/${id}`);
  };

  const onToggleSave = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isSaved: !product.isSaved } : product
      )
    );
  };

  return (
    <div className="order-list">
      <div className="orderlist-title2">MY리뷰</div>
      {products
        .filter((product) => product.isSaved)
        .map((product) => (
          <div key={product.id} onClick={() => handleDetailRecipe(product.id)}>
            <div className="product-card2">
              <div className="product-show3">
                <img
                  src={product.represent_img}
                  alt={product.title}
                  className="product-image3"
                />
                <div className="product-info2">
                  <h3 className="product-name">{product.title}</h3>
                  <div className="product-tags2">{product.tags.join(", ")}</div>
                  <div className="info-container2">
                    <img
                      className="tool_img_saved"
                      src={toolIcon2}
                      alt="Equipment"
                    />
                    <div className="saved-recipe-sub-show">
                      {product.equipment}
                    </div>
                    <img
                      className="time_img_saved"
                      src={timerIcon2}
                      alt="Cooking Time"
                    />
                    <div className="saved-recipe-sub-show">
                      {product.cookingTime}
                    </div>
                  </div>
                </div>
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(product.id);
                  }}
                >
                  <img
                    src={product.isSaved ? savedIcon : unsavedIcon}
                    alt="Save"
                  />
                </button>
              </div>
            </div>
            <hr className="divider" />
          </div>
        ))}
    </div>
  );
};

export default SavedRecipes;
