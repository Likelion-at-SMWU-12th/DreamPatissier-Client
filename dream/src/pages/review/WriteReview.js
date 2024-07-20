import React from "react";
import "../../styles/WriteReview.css";
import profile from "./bread.png";

const WriteReview = () => {
  const product = {
    id: 1,
    image: profile,
    date: "2024-07-19",
    name: "test1",
    tags: ["#프로틴", "#저당"],
    price: 10000,
    reviewed: false,
  };

  const handleSubmit = () => {
    alert("리뷰가 제출되었습니다!");
  };

  const handleCancel = () => {
    alert("리뷰가 취소되었습니다!");
  };

  return (
    <div>
      <div className="orderlist-title">리뷰쓰기</div>
      <div className="product-info">
        <div className="product-show">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-tags">{product.tags.join(" ")}</div>
            <div className="product-price">
              {product.price.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>
      <hr className="hr1" />
      <br />
      <div className="orderlist-like">구매하신 빵은 만족하셨나요?</div>
      <div className="product-actions">
        <button className="show-button">별로예요 👎🏻</button>
        <button className="show-button">만족해요 👍🏻</button>
      </div>
      <div className="orderlist-like">자세한 리뷰를 작성해 주세요</div>
      <textarea placeholder="여기에 리뷰를 작성하세요..." rows="4" cols="50" />
      <button onClick={handleSubmit}>제출</button>
      <button onClick={handleCancel}>취소</button>
    </div>
  );
};

export default WriteReview;
