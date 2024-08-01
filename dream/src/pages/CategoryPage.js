import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Product from "../components/Product";
import Warning from "../assets/warning.png";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log(`Fetching products for category: ${categoryName}`);
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/bakery/category/${categoryName}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("Fetched products:", response.data);
        setProducts(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setStatus("error");
      });
  }, [categoryName]);

  if (status === "loading") {
    return (
      <MsgBox>
        <Message>Loading...</Message>
      </MsgBox>
    );
  }

  if (status === "error") {
    return (
      <MsgBox>
        <Message>제품을 못불러와버렸다...</Message>
      </MsgBox>
    );
  }

  if (products.length === 0) {
    return (
      <MsgBox>
        <WarningImg src={Warning} />
        <Message>
          해당 카테고리의 빵이 없습니다. <br />
          다른 카테고리를 눌러보세요.
        </Message>
      </MsgBox>
    );
  }

  return (
    <ProductWrap>
      {products.map((product) => (
        <StyledLink to={`/bakery/product/${product.id}`} key={product.id}>
          <Product
            imgSrc={product.img_src} // imgSrc -> img_src
            tags={product.tags}
            name={product.name} // title -> name
            price={product.price}
          />
        </StyledLink>
      ))}
    </ProductWrap>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const MsgBox = styled.div`
  width: 100%;
  margin: 30px 0px;
  text-align: center;
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

const ProductWrap = styled.div`
  margin: 0px 25px;
  display: grid;
  grid-template-columns: repeat(2, 47vw);
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

export default CategoryPage;
