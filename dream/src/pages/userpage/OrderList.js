import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Order.css";
import profile from "./bread.png";
import axios from "axios";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/users/orders", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Received orders:", response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleReviewClick = (item) => {
    // item을 명확하게 전달
    navigate(`/users/reviews/${item.product.id}`, {
      state: { product: item.product, item },
    });
  };

  const handleAddToCartClick = (id) => {
    console.log(`Add product ${id} to cart`);
  };

  return (
    <div className="order-list">
      <div className="orderlist-title">주문목록</div>
      {orders.length === 0 ? (
        <div className="no-orders">주문이 없습니다.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-date">
              {new Date(order.created_at).toLocaleDateString()}
            </div>
            <div className="order-items">
              {(order.items || []).map((item) => {
                const product = item.product;
                return (
                  <div key={item.id} className="product-card">
                    <div className="product-show">
                      <img
                        src={product.img_src || profile}
                        alt={product.name || "Product"}
                        className="product-image"
                      />
                      <div className="product-info">
                        <h3 className="product-name">
                          {product.name || "Unknown Product"}
                        </h3>
                        <div className="product-tags">
                          {product.tags
                            ? product.tags.split(",").join(" ")
                            : "No Tags"}
                        </div>
                        <div className="quantity-price">
                          <div className="product-quantity">
                            {item.quantity}개
                          </div>
                          <div className="product-line">&#124;</div>
                          <div className="product-price">
                            {parseFloat(item.price).toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button
                        className="write-review"
                        onClick={() => handleReviewClick(item)}
                      >
                        리뷰쓰기
                      </button>
                      <button
                        className="add"
                        onClick={() => handleAddToCartClick(product.id)}
                      >
                        같은 빵 담기
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
