import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Review.css";
import profile from "./bread.png";
import { FaTrash } from "react-icons/fa";
import altIcon from "../../assets/alt.png";

const Review = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/reviews")
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("데이터를 가져오는 중 오류 발생:", error)
      );
  }, []);

  const reviewedProducts = products.filter((product) => product.reviewed);

  const handleDelete = (id) => {
    console.log("삭제하려는 리뷰 ID:", id);
    const confirmed = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");

    if (confirmed) {
      axios
        .delete(`http://localhost:3001/reviews/${id}/`)
        .then((response) => {
          console.log("리뷰가 성공적으로 삭제되었습니다");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
        })
        .catch((error) => {
          console.error("데이터 삭제 중 오류:", error.message);
          if (error.response) {
            console.error("응답 데이터:", error.response.data);
            console.error("응답 상태:", error.response.status);
            console.error("응답 헤더:", error.response.headers);
          }
        });
    }
  };

  return (
    <div className="order-list">
      <div className="orderlist-title2">MY리뷰</div>
      {reviewedProducts.length > 0 ? (
        reviewedProducts.map((product, index) => (
          <div key={product.id}>
            <div className="product-card2">
              <div className="product-date2">{product.date}</div>
              <div className="product-show2">
                <img
                  src={product.image || profile}
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
                  aria-label="Delete review"
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
            {index < reviewedProducts.length - 1 && <hr className="divider" />}
          </div>
        ))
      ) : (
        <div className="no-recipes-message">
          <img src={altIcon} alt="No reviews icon" />
          <p>작성된 리뷰가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Review;
