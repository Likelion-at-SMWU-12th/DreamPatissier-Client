import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
import styled from "styled-components";

const Detail = () => {
  //   const { id } = useParams();
  //   const [product, setProduct] = useState(null);

  //   useEffect(() => {
  //     axios
  //       .get(`http://127.0.0.1:8000/bakery/${id}/`)
  //       .then((response) => {
  //         setProduct(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching product data:", error);
  //       });
  //   }, [id]);

  //   if (!product) return <div>Loading...</div>;

  return (
    <div></div>
    // <DetailWrapper>
    //   <ProductImg src={product.imgSrc} alt={product.title} />
    //   <ProductInfo>
    //     <h1>{product.title}</h1>
    //     <p>Price: {product.price}원</p>
    //     <p>Tags: {product.tags.join(", ")}</p>
    //     <p>{product.description}</p>
    //   </ProductInfo>
    // </DetailWrapper>
  );
};

export default Detail;

const DetailWrapper = styled.div``;

const ProductImg = styled.img``;

const ProductInfo = styled.div``;
