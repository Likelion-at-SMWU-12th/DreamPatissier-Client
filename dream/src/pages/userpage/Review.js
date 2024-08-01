import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Review.css";
import profile from "./bread.png";
import { FaTrash } from "react-icons/fa";
import altIcon from "../../assets/alt.png";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/reviews", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched reviews:", response.data);
        setReviews(response.data);
      })
      .catch((error) =>
        console.error("데이터를 가져오는 중 오류 발생:", error)
      );
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    console.log("삭제하려는 리뷰 ID:", id);
    const confirmed = window.confirm("정말로 이 리뷰를 삭제하시겠습니까?");

    if (confirmed) {
      axios
        .delete(`http://127.0.0.1:8000/reviews/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          console.log("리뷰가 성공적으로 삭제되었습니다");
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review.id !== id)
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
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={review.id}>
            <div className="product-card2">
              <div className="product-date2">
                {new Date(review.created_at).toLocaleDateString()}
              </div>
              <div className="product-show2">
                <img
                  src={review.product.img_src || profile}
                  alt={review.product.name}
                  className="product-image2"
                />
                <div className="product-info2">
                  <h3 className="product-name">{review.product.name}</h3>
                  <div className="product-tags2">
                    {Array.isArray(review.product.tags)
                      ? review.product.tags.join(", ") // Join tags with comma
                      : review.product.tags}{" "}
                    {/* If already a string, display directly */}
                  </div>
                </div>
                <button
                  className="delete-button2"
                  onClick={() => handleDelete(review.id)}
                  aria-label="Delete review"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="info-container">
                <div className="product-like-show">
                  {review.satisfaction === "S" ? "만족해요" : "별로예요"}
                </div>
                <div className="product-date-show">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="show_review_text">{review.content}</div>
            </div>
            {index < reviews.length - 1 && <hr className="divider" />}
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
