import React, { useState } from "react";
import "../../styles/Review.css";
import profile from "./bread.png";
import { FaTrash } from "react-icons/fa";
import altIcon from "../../assets/alt.png";

const Review = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      date: "2024.07.19",
      image: profile,
      name: "test1",
      tags: ["#프로틴", "#저당"],
      price: 10000,
      reviewed: true,
      like: "만족해요",
      description:
        "건강빵이라고 해서 걱정했는데 정말 맛있었어요. 앞으로도 빵을 구매할 때 웰니스빵인지 확인하고 구매할 예정입니다.",
    },
    {
      id: 2,
      date: "2024-07-05",
      image: profile,
      name: "test2",
      tags: ["태그3", "태그4"],
      price: 15000,
      reviewed: true,
      like: "만족해요",
      description:
        "건강빵이라고 해서 걱정했는데 정말 맛있었어요. 앞으로도 빵을 구매할 때 웰니스빵인지 확인하고 구매할 예정입니다.",
    },
    {
      id: 3,
      date: "2024-07-05",
      image: profile,
      name: "test3",
      tags: ["태그3", "태그4"],
      price: 15000,
      reviewed: false,
    },
    {
      id: 4,
      date: "2024-07-05",
      image: profile,
      name: "test4",
      tags: ["태그3", "태그4"],
      price: 15000,
      reviewed: true,
      like: "만족해요",
      description:
        "건강빵이라고 해서 걱정했는데 정말 맛있었어요. 앞으로도 빵을 구매할 때 웰니스빵인지 확인하고 구매할 예정입니다.",
    },
  ]);

  const reviewedProducts = products.filter((product) => product.reviewed);

  const handleDelete = (id) => {
    const confirmed = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");
    if (confirmed) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="order-list">
      <div className="orderlist-title2">MY리뷰</div>
      {reviewedProducts.length > 0 ? (
        reviewedProducts.map((product) => (
          <div className="product-card2" key={product.id}>
            <div className="product-date2">{product.date}</div>
            <div className="product-show2">
              <img
                src={product.image}
                alt={product.name}
                className="product-image2"
              />
              <div className="product-info2">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-tags2">{product.tags.join(" ")}</div>
              </div>
              <button
                className="delete-button2"
                onClick={() => handleDelete(product.id)}
              >
                <FaTrash />
              </button>
            </div>
            <div className="info-container">
              <div className="product-like-show">{product.like}</div>
              <div className="product-date-show">{product.date}</div>
            </div>
            <div className="show_review_text">{product.description}</div>
          </div>
        ))
      ) : (
        <div className="no-recipes-message">
          <img src={altIcon}></img>
          <p>작성된 리뷰가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Review;
