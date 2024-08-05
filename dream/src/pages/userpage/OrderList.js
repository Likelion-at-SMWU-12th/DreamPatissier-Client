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
    <div className="new-order-list">
      <div className="new-orderlist-title">주문목록</div>
      {orders.length === 0 ? (
        <div className="new-no-orders">주문이 없습니다.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="new-order-card">
            <div className="new-order-date">
              {new Date(order.created_at).toLocaleDateString()}
            </div>
            <div className="new-order-items">
              {(order.items || []).map((item) => {
                const product = item.product;
                return (
                  <div key={item.id} className="new-product-card">
                    <div className="new-product-show">
                      <img
                        src={product.img_src || profile}
                        alt={product.name || "Product"}
                        className="new-product-image"
                      />
                      <div className="new-product-info">
                        <h3 className="new-product-name">
                          {product.name || "Unknown Product"}
                        </h3>
                        <div className="new-product-tags">
                          {product.tags
                            ? product.tags.split(",").join(" ")
                            : "No Tags"}
                        </div>
                        <div className="new-quantity-price">
                          <div className="new-product-quantity">
                            {item.quantity}개
                          </div>
                          <div className="new-product-line">&#124;</div>
                          <div className="new-product-price">
                            {parseFloat(item.price).toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="new-product-actions">
                      <button
                        className="new-write-review"
                        onClick={() => handleReviewClick(item)}
                      >
                        리뷰쓰기
                      </button>
                      <button
                        className="new-add"
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
