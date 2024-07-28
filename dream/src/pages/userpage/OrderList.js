import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Order.css";
import profile from "./bread.png";

const OrderList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/orders")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleReviewClick = (id) => {
    console.log(`Review for product ${id}`);
    navigate(`/users/reviews/${id}`);
  };

  const handleAddToCartClick = (id) => {
    console.log(`Add product ${id} to cart`);
  };

  return (
    <div className="order-list">
      <div className="orderlist-title">주문목록</div>
      {products.map((product) => (
        <React.Fragment key={product.id}>
          <div className="product-card">
            <div className="product-date">{product.date}</div>
            <div className="product-show">
              <img
                src={product.image || profile} // Fallback to a default image if not provided
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

            <div className="product-actions">
              {!product.reviewed && (
                <>
                  <button
                    className="write-review"
                    onClick={() => handleReviewClick(product.id)}
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderList;
