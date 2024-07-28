import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/WriteReview.css";

const WriteReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      console.error("No product data available");
      navigate("/");
    }
  }, [location.state, navigate]);

  const [selectedButton, setSelectedButton] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async () => {
    if (!selectedButton || !reviewText) {
      alert("Please select a rating and write a review.");
      return;
    }

    try {
      let now = new Date();
      now.setHours(now.getHours() + 9);
      let writedate = now.toISOString().split("T")[0];

      const reviewData = {
        ...product,
        like: selectedButton,
        description: reviewText,
        writedate: writedate,
        reviewed: true,
      };

      console.log("Review data:", reviewData);

      // Step 1: 리뷰 데이터 전송
      await axios.post("http://127.0.0.1:8000/reviews", reviewData);

      // Step 2: 주문의 'reviewed' 상태 업데이트
      const orderId = product.orderId || product.id;
      if (!orderId) {
        throw new Error("Order ID is missing from product data.");
      }

      console.log("Order ID for update:", orderId);

      await axios.put(`http://127.0.0.1:8000/orders/${orderId}`, {
        reviewed: true,
      });

      alert("리뷰가 제출되었습니다!");
      navigate("/users/orders");
    } catch (error) {
      console.error("There was an error submitting your review:", error);
      alert("리뷰 제출에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  if (!product) return null;

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
      <div className="product-actions2">
        <button
          className={`show-button ${
            selectedButton === "dislike" ? "selected" : ""
          }`}
          onClick={() => setSelectedButton("dislike")}
        >
          별로예요 👎🏻
        </button>
        <button
          className={`show-button ${
            selectedButton === "like" ? "selected" : ""
          }`}
          onClick={() => setSelectedButton("like")}
        >
          만족해요 👍🏻
        </button>
      </div>
      <div className="orderlist-like">자세한 리뷰를 작성해 주세요</div>
      <textarea
        className="text_review"
        placeholder="여기에 리뷰를 작성하세요"
        rows="9"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <div className="submit-button-container">
        <button className="submit-review" onClick={handleSubmit}>
          제출
        </button>
      </div>
    </div>
  );
};

export default WriteReview;
