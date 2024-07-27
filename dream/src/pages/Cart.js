import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import YellowBtn from "../components/YellowBtn";

const Cart = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [anyChecked, setAnyChecked] = useState(false);

  useEffect(() => {
    axios
      .get("/product.json")
      .then((response) => {
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

  useEffect(() => {
    const checkedItems = cartItems.some((item) => item.selected);
    setAnyChecked(checkedItems);
  }, [cartItems]);

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
        <SelectAll onClick={handleSelectAll}>
          <StyledCheck
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <span>전체선택</span>
        </SelectAll>
        <DeleteSelected anyChecked={anyChecked} onClick={handleDeleteSelected}>
          선택삭제
        </DeleteSelected>
      </CartHeader>
      <HrDiv />
      <CartItems>
        {cartItems.map((item) => (
          <React.Fragment key={item.id}>
            <CartItem>
              <SelectItem>
                <StyledCheck
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleSelectItem(item.id)}
                />
              </SelectItem>
              <ProductBox>
                <ProductImgBox>
                  <ProductImg src={item.imgSrc} alt={item.title} />
                </ProductImgBox>
                <ProductDetails>
                  <ProductText>
                    <Titles>{item.title}</Titles>
                    <Keywords>
                      {item.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </Keywords>
                    <QuantityPriceWrapper>
                      <QuantityControl>
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <strong>-</strong>
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </QuantityControl>
                      <ItemPrice>
                        {formatPrice(item.price * item.quantity)}원
                      </ItemPrice>
                    </QuantityPriceWrapper>
                  </ProductText>
                </ProductDetails>
              </ProductBox>
            </CartItem>
            <HrDiv />
          </React.Fragment>
        ))}
      </CartItems>
      <YellowBtn
        onBtnClick={() => navigate("/cart/order")}
        type={"submit"}
        width={"90%"}
        fontWeight={"800"}
        txt={"주문하기"}
        position={"fixed"}
        right={"auto"}
        bottom={"5%"}
        zIndex={1}
      />
    </CartContainer>
  );
};

export default Cart;

// 스타일 정의
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
  width: 95%;
`;

const SelectAll = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  letter-spacing: -0.5px;
  color: var(--brown);
  cursor: pointer;

  input {
    margin-right: 10px;
  }

  span {
    cursor: pointer;
  }
`;

const DeleteSelected = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.anyChecked ? "red" : "#8a8888")};
  cursor: pointer;
  font-size: 12px;
  letter-spacing: -0.5px;
`;

const StyledCheck = styled.input`
  appearance: none;
  border: 1.5px solid var(--grey);
  border-radius: 50%;
  width: 17.5px;
  height: 17.5px;
  cursor: pointer;
  position: relative;
  margin-right: 10px;

  &:checked {
    border-color: var(--yellow);

    &::after {
      content: "";
      position: absolute;
      top: 40%;
      left: 50%;
      width: 30%;
      height: 50%;
      border: solid var(--yellow);
      border-width: 0 2px 2px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
`;

const CartItems = styled.div`
  width: 100%;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

const SelectItem = styled.div`
  margin-right: 10px;
`;

const ProductBox = styled.div`
  display: flex;
  width: 100%;
  margin-left: -10px;
`;

const ProductImgBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const ProductImg = styled.img`
  width: 100px;
  height: 100px;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 27px;
`;

const Tag = styled.span`
  color: var(--yellow);
  font-weight: 800;
  font-size: 12px;
  letter-spacing: -0.5px;
`;

const Titles = styled.p`
  color: var(--brown);
  font-size: 14px;
  font-weight: 800;
  margin: 0;
  margin-bottom: 5px;
  letter-spacing: -0.5px;
`;

const QuantityPriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--brown);

  button {
    background: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid black;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  }

  span {
    padding: 0 10px;
  }
`;

const ItemPrice = styled.div`
  font-weight: 800;
  color: var(--brown);
  white-space: nowrap;
  font-size: 16px;
  letter-spacing: -0.5px;
  position: absolute;
  right: 30px;
`;
const HrDiv = styled.div`
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  box-shadow: 0 2px 4px 0 rgba(217, 217, 217, 0.5);
`;
