import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Footer from "../components/Footer";
import styled from "styled-components";
import Search from "../components/Search";
import Category from "../components/Category";
import CategoryPage from "./CategoryPage";
import SearchPage from "./SearchPage";
import Detail from "./Detail";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
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
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("/bakery/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
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

  const handleCategoryClick = (name) => {
    setSelectedCategory(name);
    navigate(`/bakery/category/${name}`);
  };

  const handleSearch = (tagsArray) => {
    navigate(`/bakery/search/${tagsArray.join(",")}`);
  };

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
            isSelected={selectedCategory === category.name}
            onClick={handleCategoryClick}
          />
        ))}
      </CategoryWrap>
      {location.pathname === "/bakery" && (
        <ProductBox>
          {randomProducts.map((product) => (
            <StyledLink to={`/bakery/product/${product.id}`} key={product.id}>
              <Product
                key={product.id}
                imgSrc={product.img_src} // imgSrc -> img_src
                tags={product.tags}
                name={product.name} // title -> name
                price={product.price}
              />
            </StyledLink>
          ))}
        </ProductBox>
      )}
      <Routes>
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="search/:tags" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

// 카테고리 데이터
const categories = [
  { name: "bread", uiName: "식빵", imgSrc: Morning },
  { name: "baguette", uiName: "바게트/치아바타", imgSrc: Baguette },
  { name: "bagel", uiName: "베이글", imgSrc: Bagle },
  { name: "cake", uiName: "케이크", imgSrc: Cake },
  { name: "donut", uiName: "도넛", imgSrc: Donut },
  { name: "cream", uiName: "크림빵", imgSrc: Cream },
  { name: "root_vegetable", uiName: "구황작물빵", imgSrc: Harverst }, // harverst가 아니라 올바른 imgSrc를 사용해야 합니다.
  { name: "special", uiName: "기획전", imgSrc: Event },
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
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
