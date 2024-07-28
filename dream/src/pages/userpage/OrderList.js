import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Order.css";
import profile from "./bread.png";
import axios from "axios";

const OrderList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users/orders")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleReviewClick = (product) => {
    navigate(`/users/reviews/${product.id}`, { state: { product } });
  };

  const handleAddToCartClick = (id) => {
    console.log(`Add product ${id} to cart`);
  };

  return (
    <div className="order-list">
      <div className="orderlist-title">주문목록</div>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-date">{product.date}</div>
          <div className="product-show">
            <img
              src={product.image || profile}
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
          <div className="product-actions">
            {!product.reviewed && (
              <>
                <button
                  className="write-review"
                  onClick={() => handleReviewClick(product)}
                >
                  리뷰쓰기
                </button>
                <button
                  className="add"
                  onClick={() => handleAddToCartClick(product.id)}
                >
                  같은 빵 담기
                </button>
              </>
            )}
            {product.reviewed && (
              <button
                className="add"
                onClick={() => handleAddToCartClick(product.id)}
              >
                같은 빵 담기
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
