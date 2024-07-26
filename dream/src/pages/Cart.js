import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Product from "../components/Product";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    axios
      .get("/product.json")
      .then((response) => {
        // 예시로 첫 번째, 두 번째 제품만 장바구니에 추가
        const initialCartItems = response.data.slice(0, 2).map((product) => ({
          ...product,
          quantity: 1,
          selected: false,
        }));
        setCartItems(initialCartItems);
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
      });
  }, []);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems(cartItems.map((item) => ({ ...item, selected: !selectAll })));
  };

  const handleSelectItem = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleDeleteSelected = () => {
    setCartItems(cartItems.filter((item) => !item.selected));
    setSelectAll(false);
  };

  return (
    <CartContainer>
      <CartHeader>
        <SelectAll>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span>전체선택</span>
        </SelectAll>
        <DeleteSelected onClick={handleDeleteSelected}>선택삭제</DeleteSelected>
      </CartHeader>
      <CartItems>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <SelectItem>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleSelectItem(item.id)}
              />
            </SelectItem>
            <Product
              imgSrc={item.imgSrc}
              tags={item.tags}
              title={item.title}
              price={item.price}
            />
            <QuantityControl>
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </button>
            </QuantityControl>
            <ItemPrice>{item.price * item.quantity}원</ItemPrice>
          </CartItem>
        ))}
      </CartItems>
      <OrderButton>주문하기</OrderButton>
    </CartContainer>
  );
};

export default Cart;

// 스타일 정의
const CartContainer = styled.div`
  padding: 20px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SelectAll = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  letter-spacing: -0.5px;
  color: var(--brown);
  input {
    margin-right: 5px;
  }
  cursor: pointer;
`;

const DeleteSelected = styled.button`
  background: none;
  border: none;
  color: #8a8888;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: -0.5px;
`;

const CartItems = styled.div`
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const SelectItem = styled.div`
  margin-right: 10px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;

  button {
    background: none;
    border: 1px solid #ddd;
    padding: 5px;
    cursor: pointer;

    &:first-child {
      border-right: none;
    }

    &:last-child {
      border-left: none;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  span {
    padding: 0 10px;
  }
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #333;
`;

const OrderButton = styled.button`
  background-color: #ffb415;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
`;
