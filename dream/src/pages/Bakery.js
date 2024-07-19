import React from "react";
import Footer from "../components/Footer";
import bbangSlide from "../assets/bbangSlide.png";
import Product from "../components/Product";
import styled from "styled-components";

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
      <div>검색바</div>
      <div>카테고리</div>
      <Product />
      <Product />
      <Product />
      <Product />
      <Footer />
    </div>
  );
}

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

export default Bakery;
