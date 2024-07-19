//
// 마이리뷰
//

import React, { useState } from "react";
import "../../styles/Order.css";
import profile from "./bread.png";

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

  return (
    <div className="order-list">
      <div className="orderlist-title">주문목록</div>
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
                <div className="product-tags">{product.tags.join("\t")}</div>
                <div className="product-price">
                  {product.price.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Review;
