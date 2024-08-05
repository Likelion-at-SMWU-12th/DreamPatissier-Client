import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/WriteReview.css";

const WriteReview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (location.state && location.state.product && location.state.item) {
      setProduct(location.state.product);
      setItem(location.state.item);
    } else {
      console.error("No product or item data available");
      navigate("/");
    }
  }, [location.state, navigate]);

  const [selectedButton, setSelectedButton] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (!selectedButton || !reviewText) {
      alert("Please select a rating and write a review.");
      return;
    }

    if (!item) {
      console.error("No item data available");
      alert("Item data is missing.");
      return;
    }

    const reviewData = {
      content: reviewText,
      satisfaction: selectedButton === "like" ? "S" : "D",
      order_item_id: item.id, // OrderItem ID를 전달
    };

    console.log("Review data:", reviewData);

    const token = localStorage.getItem("token");

    axios
      .post("http://127.0.0.1:8000/users/reviews/", reviewData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Review submitted:", response.data);

        alert("리뷰가 제출되었습니다!");
        navigate("/users/orders");
      })
      .catch((error) => {
        console.error("There was an error submitting your review:", error);
        alert("리뷰 제출에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  if (!product || !item) return null;

  const productTags =
    typeof product.tags === "string"
      ? product.tags.split(",").map((tag) => tag.trim())
      : product.tags;

  return (
    <div>
      <div className="orderlist-title">리뷰쓰기</div>
      <div className="product-info">
        <div className="product-show">
          <img
            src={product.img_src}
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-tags">{productTags.join(" ")}</div>
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
