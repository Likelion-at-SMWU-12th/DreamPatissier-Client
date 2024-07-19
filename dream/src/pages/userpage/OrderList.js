import React, { useState } from "react";
import "../../styles/Order.css";
import profile from "./bread.png";

const OrderList = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      date: "2024-07-19",
      image: profile,
      name: "test1",
      tags: ["태그1", "태그2"],
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
  ]);

  const handleReviewClick = (id) => {
    console.log(`Review for product ${id}`);
  };

  const handleAddToCartClick = (id) => {
    console.log(`Add product ${id} to cart`);
  };

  return (
    <div className="order-list">
      {products.map((product) => (
        <React.Fragment key={product.id}>
          <div className="product-card">
            <div className="product-date">{product.date}</div>
            <div className="product-show">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-tags">태그: {product.tags.join(", ")}</p>
                <p className="product-price">
                  가격: {product.price.toLocaleString()}원
                </p>
              </div>
            </div>

            <div className="product-actions">
              {product.reviewed ? (
                <button onClick={() => handleAddToCartClick(product.id)}>
                  같은 빵 담기
                </button>
              ) : (
                <button onClick={() => handleReviewClick(product.id)}>
                  리뷰쓰기
                </button>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderList;
