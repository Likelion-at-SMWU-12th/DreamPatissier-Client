// 기본 기능
import React from "react";
import Footer from "../components/Footer";
import styled from "styled-components";

// 컴포넌트

import Product from "../components/Product";
import Search from "../components/Search";
import Category from "../components/Category";

// 이미지

import bbangSlide from "../assets/bbangSlide.png";
import Oatmeal from "../assets/pro-Oatmeal.png";
import Rice from "../assets/pro-Rice.png";
import Oreo from "../assets/pro-Oreo.png";
import Ciabatta from "../assets/pro-Ciabatta.png";

//
// 웰니스빵 탭
//

function Bakery() {
  return (
    <div>
      <div>
        <BannerBox>
          <BannerImg img src={bbangSlide} />
        </BannerBox>
      </div>
      <Search></Search>
      <CategoryWrap>
        {categories.map((category) => (
          <Category
            key={category.name}
            category_name={category.name}
            imgSrc={category.imgSrc}
          />
        ))}
      </CategoryWrap>
      <ProductBox>
        <Product
          imgSrc={Oatmeal}
          tags={["#프로틴", " #저당"]}
          title="[삼림] 프로젝트:H 큐브식당 비건빵"
          price={9900}
        />
        <Product
          imgSrc={Rice}
          tags={["#가루쌀", "#식물성", "#밀가루X", "설탕X"]}
          title="[공디저트] 쌀베이글"
          price={15000}
        />
        <Product
          imgSrc={Oreo}
          tags={["#글루텐프리", "#저당", "#건강한지방", "밀가루X"]}
          title="[카토라] 오레오 크림 치즈케이크"
          price={8145}
        />
        <Product
          imgSrc={Ciabatta}
          tags={["#곤약", "#고단백", "#식물성"]}
          title="[라이트리] 곤약빵 통밀 치아바타"
          price={9900}
        />
      </ProductBox>
      <Footer />
    </div>
  );
}

// 카테고리 데이터

const categories = [
  { name: "식빵/모닝빵", imgSrc: "path/to/category1.jpg" },
  { name: "바게트/치아바타", imgSrc: "path/to/category2.jpg" },
  { name: "베이글", imgSrc: "path/to/category3.jpg" },
  { name: "케이크", imgSrc: "path/to/category4.jpg" },
  { name: "도넛/스콘", imgSrc: "path/to/category5.jpg" },
  { name: "크림빵", imgSrc: "path/to/category6.jpg" },
  { name: "구황작물빵", imgSrc: "path/to/category7.jpg" },
  { name: "기획전", imgSrc: "path/to/category8.jpg" },
];

// CSS

const BannerBox = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;
const BannerImg = styled.img`
  width: 100%;
  max-width: 100%;
  height: 200px;
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
  gap: 20px;
  margin-bottom: 20px;
`;

export default Bakery;
