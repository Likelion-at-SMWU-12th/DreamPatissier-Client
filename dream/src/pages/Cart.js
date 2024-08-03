import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import YellowBtn from "../components/YellowBtn";
import Warning from "../assets/warning.png";

const Cart = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US").format(price);
  };

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [anyChecked, setAnyChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/cart-items/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch cart items", error);
      });
  }, []);

  useEffect(() => {
    const checkedItems = cartItems.some((item) => item.selected);
    setAnyChecked(checkedItems);

    const total = cartItems.reduce((acc, item) => {
      return acc + item.bread.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleQuantityChange = (id, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + delta } : item
    );
    setCartItems(updatedItems);

    const updatedItem = updatedItems.find((item) => item.id === id);

    // 서버에 PUT 요청을 통해 수량 업데이트
    const token = localStorage.getItem("token");
    axios
      .put(
        "http://127.0.0.1:8000/cart/",
        { id: updatedItem.id, quantity: updatedItem.quantity }, // API 명세에 맞는 데이터 형식
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Quantity updated successfully", response.data);
      })
      .catch((error) => {
        console.error("Failed to update quantity", error);
      });
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
    const selectedItems = cartItems.filter((item) => item.selected);
    const token = localStorage.getItem("token");

    axios
      .delete("http://127.0.0.1:8000/cart-items/", {
        headers: {
          Authorization: `Token ${token}`,
        },
        data: {
          items: selectedItems.map((item) => item.id),
        },
      })
      .then(() => {
        setCartItems(cartItems.filter((item) => !item.selected));
        setSelectAll(false);
      })
      .catch((error) => {
        console.error("Failed to delete selected items", error);
      });
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
        {cartItems.length === 0 ? (
          <MsgBox>
            <WarningImg src={Warning} />
            <Message>장바구니에 상품이 없습니다.</Message>
          </MsgBox>
        ) : (
          cartItems.map((item) => {
            const tags =
              typeof item.bread.tags === "string"
                ? item.bread.tags.split(",").map((tag) => tag.trim())
                : item.bread.tags || [];

            return (
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
                      <ProductImg
                        src={item.bread.img_src}
                        alt={item.bread.name}
                      />
                    </ProductImgBox>
                    <ProductDetails>
                      <ProductText>
                        <Titles>{item.bread.name}</Titles>
                        <Keywords>
                          {tags.map((tag, index) => (
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
                            {formatPrice(item.bread.price * item.quantity)}원
                          </ItemPrice>
                        </QuantityPriceWrapper>
                      </ProductText>
                    </ProductDetails>
                  </ProductBox>
                </CartItem>
                <HrDiv />
              </React.Fragment>
            );
          })
        )}
      </CartItems>
      <TotalWrap>
        <TotalText>총 결제 예상 금액</TotalText>
        <TotalPrice>{formatPrice(totalPrice)}원</TotalPrice>
      </TotalWrap>
      <YellowBtn
        onBtnClick={() => navigate("/cart/order/")}
        type={"submit"}
        width={"90%"}
        fontWeight={"800"}
        txt={"결제하기"}
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
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(217, 217, 217, 0.25);
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

const MsgBox = styled.div`
  width: 100%;
  text-align: center;
  margin: 100px 0px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 14px;
  color: #979797;
  font-family: "Noto Sans KR";
  font-weight: medium;
  padding-bottom: 10px;
`;

const WarningImg = styled.img`
  width: 54px;
  height: auto;
  margin-bottom: 15px;
`;

const TotalWrap = styled.div`
  padding: 20px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px 0 rgba(217, 217, 217, 0.5);
  border-bottom: 1px solid #d9d9d9;
  color: var(--brown);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.5px;
`;
const TotalText = styled.div`
  margin-left: 20px;
`;
const TotalPrice = styled.div`
  margin-right: 20px;
`;
