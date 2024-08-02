import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import timerIcon2 from "../../assets/timer2.png";
import toolIcon2 from "../../assets/tool2.png";
import "../../styles/SavedRecipes.css";
import savedIcon from "../../assets/saved-icon.png";
import unsavedIcon from "../../assets/unsaved-icon.png";
import re_image from "./bread.png"; // 필요 없으면 삭제할 수 있음

const SavedRecipes = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");

    if (!storedToken) {
      console.error("No token found in localStorage.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/users/saved-recipes", {
        headers: {
          Authorization: `Token ${storedToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          if (Array.isArray(data)) {
            setProducts(
              data.map((product) => ({
                ...product,
                tags: product.tags ? product.tags.split(",") : [],
                equipment: product.equipment
                  ? product.equipment.split(",")
                  : [],
              }))
            );
          } else {
            console.error("Data is not an array", data);
          }
        } else {
          console.error("Unexpected response status:", response.status);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error:",
            error.response.data,
            "Status:",
            error.response.status
          );
        } else if (error.request) {
          console.error("Error: No response received");
        } else {
          console.error("Error:", error.message);
        }
      });
  }, [token]);

  const handleDetailRecipe = (id) => {
    navigate(`/recipes/${id}`);
  };

  const onToggleSave = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isSaved: !product.isSaved } : product
      )
    );
  };

  return (
    <div className="order-list">
      <div className="orderlist-title2">저장한 레시피</div>
      {products
        .filter((product) => product.isSaved)
        .map((product) => (
          <div key={product.id} onClick={() => handleDetailRecipe(product.id)}>
            <div className="product-card2">
              <div className="product-show3">
                <img
                  src={product.represent_img || re_image}
                  alt={product.title}
                  className="product-image3"
                />
                <div className="product-info2">
                  <h3 className="product-name">{product.title}</h3>
                  <div className="product-tags2">{product.tags.join(", ")}</div>
                  <div className="info-container2">
                    <img
                      className="tool_img_saved"
                      src={toolIcon2}
                      alt="Equipment"
                    />
                    <div className="saved-recipe-sub-show">
                      {product.equipment.join(", ")}
                    </div>
                    <img
                      className="time_img_saved"
                      src={timerIcon2}
                      alt="Cooking Time"
                    />
                    <div className="saved-recipe-sub-show">
                      {product.cookingTime}
                    </div>
                  </div>
                </div>
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(product.id);
                  }}
                >
                  <img
                    src={product.isSaved ? savedIcon : unsavedIcon}
                    alt="Save"
                  />
                </button>
              </div>
            </div>
            <hr className="divider" />
          </div>
        ))}
    </div>
  );
};

export default SavedRecipes;
