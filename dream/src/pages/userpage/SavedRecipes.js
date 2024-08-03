import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import timerIcon2 from "../../assets/timer2.png";
import toolIcon2 from "../../assets/tool2.png";
import "../../styles/SavedRecipes.css";
import savedIcon from "../../assets/saved-icon.png";
import unsavedIcon from "../../assets/unsaved-icon.png";
import altIcon from "../../assets/alt.png";

const SavedRecipes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");

    if (!storedToken) {
      console.error("No token found in localStorage.");
      setLoading(false);
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
            setRecipes(
              data.map((recipe) => ({
                ...recipe,
                tags: recipe.tags ? recipe.tags.split(",") : [],
                equipment: recipe.equipment ? recipe.equipment.split(",") : [],
                isSaved: true, // 서버에서 가져온 데이터로 isSaved 상태를 설정합니다.
              }))
            );
          } else {
            console.error("Data is not an array", data);
          }
        } else {
          console.error("Unexpected response status:", response.status);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token]);

  const handleDetailRecipe = (id) => {
    navigate(`/recipes/${id}`);
  };

  const onToggleSave = (id) => {
    axios
      .post(
        `http://127.0.0.1:8000/users/saved-recipes/${id}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === id ? { ...recipe, isSaved: !recipe.isSaved } : recipe
          )
        );
      })
      .catch((error) => {
        console.error("Failed to toggle save status:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading saved recipes: {error.message}</div>;
  }

  return (
    <div className="order-list">
      <div className="orderlist-title2">저장한 레시피</div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id} onClick={() => handleDetailRecipe(recipe.id)}>
            <div className="product-card2">
              <div className="product-show3">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="product-image3"
                />
                <div className="product-info2">
                  <h3 className="product-name">{recipe.title}</h3>
                  <div className="product-tags2">{recipe.tags.join(", ")}</div>
                  <div className="info-container2">
                    <img
                      className="tool_img_saved"
                      src={toolIcon2}
                      alt="Equipment"
                    />
                    <div className="saved-recipe-sub-show">
                      {recipe.equipment}
                    </div>
                    <img
                      className="time_img_saved"
                      src={timerIcon2}
                      alt="Cooking Time"
                    />
                    <div className="saved-recipe-sub-show">
                      {recipe.cookingTime || "시간 미정"}
                    </div>
                  </div>
                </div>
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(recipe.id);
                  }}
                >
                  <img
                    src={recipe.isSaved ? savedIcon : unsavedIcon}
                    alt="Save"
                  />
                </button>
              </div>
            </div>
            <hr className="divider" />
          </div>
        ))
      ) : (
        <div className="no-recipes-message">
          <img src={altIcon} alt="No recipes icon" />
          <p>저장된 레시피가 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
