import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/RecipeDetail.css";
import init_image from "./init_recipe_image.png";

import timerIcon from "../../assets/timer.png";
import toolIcon from "../../assets/tool.png";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const { id } = useParams();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    const fetchRecipe = () => {
      axios
        .get(`http://127.0.0.1:8000/recipes/${id}`, {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        })
        .then((response) => {
          setRecipe(response.data);
          // 로그인된 사용자 ID를 적절히 교체해야 합니다.
          setIsAuthor(response.data.authorId === /* 로그인된 사용자 ID */ 1);
        })
        .catch((error) => {
          console.error("레시피 불러오기에 실패했습니다:", error);
        });
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail-container">
      {/* 사진 */}
      <div className="recipe-image-container">
        <img
          src={recipe.represent_img || init_image}
          alt="대표사진"
          className="recipe-re-image"
        />
      </div>

      {/* 빵 이름 및 태그, 버튼 */}
      <div className="header-container">
        <div className="left-content">
          <div className="show_title">{recipe.title}</div>
          <div className="show_tag">
            {Array.isArray(recipe.tags) ? recipe.tags.join(", ") : ""}
          </div>
        </div>
        <div className="right-content">
          {isAuthor ? (
            <>
              <button className="edit-button">수정하기</button>
              <button className="delete-button">삭제하기</button>
            </>
          ) : (
            <button className="scrap-button">스크랩</button>
          )}
        </div>
      </div>

      {/* 구분선 */}
      <hr className="line_show" />

      <div className="section-container">
        {/* 왼쪽: 재료 */}
        <div className="section-left">
          <div className="cate_show">재료</div>
          <div className="li_show">
            <ul>
              {Array.isArray(recipe.ingredients) ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-name">{ingredient.item}</span>
                    <span className="ingredient-quantity">
                      {ingredient.quantity}
                    </span>
                  </li>
                ))
              ) : (
                <li>재료 정보가 없습니다.</li>
              )}
            </ul>
          </div>
        </div>

        {/* 오른쪽: 조리시간과 조리도구 */}
        <div className="section-right">
          <div>
            <div className="cate_show">
              <img className="time_img" src={timerIcon} alt="조리시간 아이콘" />
              조리시간
            </div>
            <div className="time_show">{recipe.cookingTime}</div>
          </div>
          <div>
            <div className="cate_show">
              <img className="tool_img" src={toolIcon} alt="조리도구 아이콘" />
              조리도구
            </div>
            <div className="equi_show">{recipe.equipment}</div>
          </div>
        </div>
      </div>

      {/* 조리 단계 */}
      <div className="steps-container">
        <h2>Steps</h2>
        {Array.isArray(recipe.steps) ? (
          recipe.steps.map((step, index) => (
            <div key={index} className="step">
              <img
                src={step.image || init_image}
                alt={`Step ${index + 1}`}
                className="step-image"
              />
              <p>{step.description}</p>
            </div>
          ))
        ) : (
          <p>조리 단계 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
