import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Footer from "../components/Footer";
import styled from "styled-components";
import Search from "../components/Search";
import Category from "../components/Category";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// 이미지
import bbangSlide from "../assets/bbangSlide.png";
import Morning from "../assets/CT-morning.png";
import Bagle from "../assets/CT-bagle.png";
import Baguette from "../assets/CT-baugette.png";
import Cake from "../assets/CT-cake.png";
import Donut from "../assets/CT-donut.png";
import Cream from "../assets/CT-cream.png";
import Harverst from "../assets/CT-harvest.png";
import Event from "../assets/CT-event.png";

function Bakery() {
  const navigate = useNavigate();
  const location = useLocation();
  const [randomProducts, setRandomProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // 더미 데이터 로드
    axios
      .get("/product.json")
      .then((response) => {
        const shuffledProducts = response.data.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffledProducts);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
        setStatus("error");
      });
  }, []);

  const handleSearch = (tagsArray) => {
    navigate(`/bakery/search/${tagsArray.join(",")}`);
  };

  // 로딩 중인 경우
  if (status === "loading") {
    return (
      <MsgBox>
        <Message>Loading...</Message>
      </MsgBox>
    );
  }

  // 오류가 발생한 경우
  if (status === "error") {
    return (
      <MsgBox>
        <Message>제품을 못불러와버렸다...</Message>
      </MsgBox>
    );
  }

  return (
    <div>
      <div>
        <BannerBox>
          <BannerImg src={bbangSlide} />
        </BannerBox>
      </div>
      <Search onSearch={handleSearch} />
      <CategoryWrap>
        {categories.map((category) => (
          <Category
            key={category.name}
            name={category.name}
            uiName={category.uiName}
            imgSrc={category.imgSrc}
            onClick={() => navigate(`/category/${category.name}`)}
          />
        ))}
      </CategoryWrap>
      {location.pathname === "/bakery" && (
        <ProductBox>
          {randomProducts.map((product) => (
            <Product
              key={product.id}
              imgSrc={product.imgSrc}
              tags={product.tags}
              title={product.title}
              price={product.price}
            />
          ))}
        </ProductBox>
      )}
      <Outlet />
      <Footer />
    </div>
  );
}

// 카테고리 데이터
const categories = [
  { name: "plainbread", uiName: "식빵/모닝빵", imgSrc: Morning },
  { name: "baguette", uiName: "바게트/치아바타", imgSrc: Baguette },
  { name: "bagle", uiName: "베이글", imgSrc: Bagle },
  { name: "cake", uiName: "케이크", imgSrc: Cake },
  { name: "donut", uiName: "도넛/스콘", imgSrc: Donut },
  { name: "cream", uiName: "크림빵", imgSrc: Cream },
  { name: "harverst", uiName: "구황작물빵", imgSrc: Harverst },
  { name: "event", uiName: "기획전", imgSrc: Event },
];

// CSS
const BannerBox = styled.div`
  position: relative;
  padding-top: 56.25%;
  width: 100%;
`;

const BannerImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductBox = styled.div`
  margin: 0px 25px;
  display: grid;
  grid-template-columns: repeat(2, 47vw);
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const CategoryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px 0px;
  padding-bottom: 25px;
  margin: 10px;
`;

const MsgBox = styled.div`
  width: 100%;
  margin: 100px 0px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 18px;
  color: #999;
`;

export default Bakery;
