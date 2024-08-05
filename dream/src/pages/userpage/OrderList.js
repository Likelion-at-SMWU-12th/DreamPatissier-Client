import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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

        // Sort orders by date in descending order (most recent first)
        const sortedOrders = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setOrders(sortedOrders);
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

  let lastOrderDate = ""; // 마지막으로 출력한 주문 날짜를 추적합니다.

  return (
    <OrderListContainer>
      <OrderListTitle>주문목록</OrderListTitle>
      {orders.length === 0 ? (
        <NoOrdersMessage>주문이 없습니다.</NoOrdersMessage>
      ) : (
        orders.map((order) => {
          const orderDate = new Date(order.created_at).toLocaleDateString();

          // 마지막으로 출력한 날짜와 현재 주문의 날짜가 같은지 확인합니다.
          const showDate = lastOrderDate !== orderDate;
          lastOrderDate = orderDate; // 마지막 날짜를 업데이트합니다.

          return (
            <OrderCard key={order.id}>
              {showDate && <OrderDate>{orderDate}</OrderDate>}
              <OrderItems>
                {(order.items || []).map((item) => {
                  const product = item.product;
                  return (
                    <ProductCard key={item.id}>
                      <ProductShow>
                        <ProductImage
                          src={product.img_src || profile}
                          alt={product.name || "Product"}
                        />
                        <ProductInfo>
                          <ProductName>
                            {product.name || "Unknown Product"}
                          </ProductName>
                          <ProductTags>
                            {product.tags
                              ? product.tags.split(",").join(" ")
                              : "No Tags"}
                          </ProductTags>
                          <QuantityPrice>
                            <ProductQuantity>{item.quantity}개</ProductQuantity>
                            <ProductLine>&#124;</ProductLine>
                            <ProductPrice>
                              {(
                                parseFloat(item.price) * item.quantity
                              ).toLocaleString()}
                              원
                            </ProductPrice>
                          </QuantityPrice>
                        </ProductInfo>
                      </ProductShow>
                      <ProductActions>
                        <WriteReviewButton
                          onClick={() => handleReviewClick(item)}
                        >
                          리뷰쓰기
                        </WriteReviewButton>
                        <AddButton
                          onClick={() => handleAddToCartClick(product.id)}
                        >
                          같은 빵 담기
                        </AddButton>
                      </ProductActions>
                    </ProductCard>
                  );
                })}
              </OrderItems>
            </OrderCard>
          );
        })
      )}
    </OrderListContainer>
  );
};

export default OrderList;

// Styled Components 정의

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
`;

const OrderListTitle = styled.div`
  width: 80%;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
`;

const NoOrdersMessage = styled.div`
  font-size: 16px;
  color: #555;
`;

const OrderCard = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const OrderDate = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 13px;
  font-weight: 900;
  margin: 22px 0 15px 0;
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCard = styled.div`
  padding: 20px 15px 0 15px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
`;

const ProductShow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProductImage = styled.img`
  border-radius: 10px;
  width: 89px;
  height: 89px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 15px;
`;

const ProductName = styled.div`
  color: #471d06;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 5px;
`;

const ProductTags = styled.div`
  color: #ffb415;
  font-weight: 700;
  font-size: 11px;
`;

const QuantityPrice = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const ProductPrice = styled.div`
  color: #471d06;
  font-size: 16px;
  letter-spacing: -0.5px;
  line-height: 22px;
  font-weight: 800;
`;

const ProductLine = styled.div`
  color: #471d06;
  margin-right: 10px;
  margin-top: -2px;
  font-weight: 400;
  opacity: 30%;
`;

const ProductQuantity = styled.div`
  color: #471d06;
  font-size: 16px;
  font-weight: 800;
  margin-right: 10px;
  letter-spacing: -0.5px;
`;

const ProductActions = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const WriteReviewButton = styled.button`
  margin: 20px 10px;
  height: 40px;
  flex: 1;
  color: #471d06;
  font-size: 14px;
  letter-spacing: -0.5px;
  font-weight: 800;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: white;
  border: 1.5px solid #471d06;

  &:hover {
    color: #ffc851;
    background-color: #471d06;
  }
`;

const AddButton = styled.button`
  margin: 20px 10px;
  flex: 1;
  color: #471d06;
  font-size: 14px;
  letter-spacing: -0.5px;
  font-weight: 800;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: none;
  background-color: #ffc851;

  &:hover {
    color: #ffc851;
    background-color: #773d1e;
  }
`;
