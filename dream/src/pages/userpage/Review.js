import React, { useState } from "react";
import "../../styles/Review.css";
import profile from "./bread.png";
import { FaTrash } from "react-icons/fa";

const Review = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      date: "2024-07-19",
      image: profile,
      name: "test1",
      tags: ["#프로틴", "#저당"],
      price: 10000,
      reviewed: false,
    },
    {
      id: 2,
      date: "2024-07-05",
      image: profile,
      name: "test2",
      tags: ["태그3", "태그4"],
      price: 15000,
      reviewed: true,
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
      <div className="orderlist-title2">주문목록</div>
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
                <div className="product-price">
                  {product.price.toLocaleString()}원
                </div>
              </div>
              <button
                className="delete-button2"
                onClick={() => handleDelete(product.id)}
              >
                <FaTrash />
              </button>
            </div>
            <div>
              <div className="show_review_text">리뷰가 나올 div 영역</div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-reviews">리뷰가 있는 제품이 없습니다.</div>
      )}
    </div>
  );
};

export default Review;
