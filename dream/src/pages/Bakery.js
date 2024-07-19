import React from "react";
import Footer from "../components/Footer";
import bbangSlide from "../assets/bbangSlide.png";
import Product from "../components/Product";

//
// 웰니스빵
//

function Bakery() {
  return (
    <div>
      <div>
        <img src={bbangSlide} />
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

export default Bakery;
