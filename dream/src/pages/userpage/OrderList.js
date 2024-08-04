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
          Authorization: `Token ${token}`, // 헤더에 토큰 추가
        },
      })
      .then((response) => {
        setOrders(response.data);
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
      {orders.length === 0 ? (
        <div className="no-orders">주문이 없습니다.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="product-card">
                  <div className="product-date">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                  <div className="product-show">
                    {" "}
                    {/* Flex container 추가 */}
                    <img
                      src={item.image || profile}
                      alt={item.name || "Product"}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-name">
                        {item.name || "Unknown Product"}
                      </h3>
                      <div className="product-tags">
                        {item.tags ? item.tags.join(" ") : "No Tags"}
                      </div>
                      <div className="product-price">
                        {parseFloat(order.total_price).toLocaleString()}원
                      </div>
                    </div>
                  </div>
                  <div className="product-actions">
                    {!item.reviewed && (
                      <>
                        <button
                          className="write-review"
                          onClick={() => handleReviewClick(item)}
                        >
                          리뷰쓰기
                        </button>
                        <button
                          className="add"
                          onClick={() => handleAddToCartClick(item.id)}
                        >
                          같은 빵 담기
                        </button>
                      </>
                    )}
                    {item.reviewed && (
                      <button
                        className="add"
                        onClick={() => handleAddToCartClick(item.id)}
                      >
                        같은 빵 담기
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
