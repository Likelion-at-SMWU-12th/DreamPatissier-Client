// 기본 기능 & 컴포넌트
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import styled from "styled-components";
import Search from "../components/Search";
import Category from "../components/Category";
import Product from "../components/Product";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

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

// 임시 더미 데이터 (추후 API로 대체)
const dummyProducts = [
  {
    id: 1,
    categoryName: "plainbread",
    imgSrc: "/images/oatmeal.png",
    tags: ["#프로틴", "#저당"],
    title: "[삼림] 프로젝트:H 큐브식빵 흥국오트밀",
    price: 9900,
  },
  {
    id: 2,
    categoryName: "bagle",
    imgSrc: "/images/rice.png",
    tags: ["#가루쌀", "#식물성", "#밀가루X", "설탕X"],
    title: "[공디저트] 쌀베이글",
    price: 15000,
  },
  {
    id: 3,
    categoryName: "cake",
    imgSrc: "/images/oreo.png",
    tags: ["#글루텐프리", "#저당", "#건강한지방", "밀가루X"],
    title: "[카토라] 오레오 크림 치즈케이크",
    price: 8145,
  },
  {
    id: 4,
    categoryName: "baguette",
    imgSrc: "/images/ciabatta.png",
    tags: ["#곤약", "#고단백", "#식물성"],
    title: "[라이트리] 곤약빵 통밀 치아바타",
    price: 9900,
  },
  {
    id: 5,
    categoryName: "donut",
    imgSrc: "/images/chodonut.png",
    tags: ["#프로틴", "#저당", "설탕X"],
    title: "[삼림] 프로젝트:H 도넛 더블초코",
    price: 16900,
  },
  {
    id: 6,
    categoryName: "harverst",
    imgSrc: "/images/potato.png",
    tags: ["#구황작물", "#글루텐프리"],
    title: "[달달] 감자빵",
    price: 19000,
  },
];
//
// 웰니스 빵 탭
//

function Bakery() {
  const navigate = useNavigate();
  const location = useLocation();
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const shuffleProducts = dummyProducts.sort(() => 0.5 - Math.random());
    setRandomProducts(shuffleProducts.slice(0, 4)); // 4개의 랜덤 제품
  }, []);

  return (
    <div>
      {location.pathname === "/bakery" && (
        <>
          <div>
            <BannerBox>
              <BannerImg src={bbangSlide} />
            </BannerBox>
          </div>
          <Search />
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
        </>
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5%;
`;

const CategoryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px 0px;
  margin-bottom: 20px;
  margin: 10px;
`;

export default Bakery;
