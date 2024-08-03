import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/RecipeDetail.css";
import init_image from "./init_recipe_image.png";

import timerIcon from "../../assets/timer.png";
import toolIcon from "../../assets/tool.png";
import savedIcon from "../../assets/saved-icon.png";
import unsavedIcon from "../../assets/unsaved-icon.png";
import editIcon from "../../assets/edit-icon.png";
import deleteIcon from "../../assets/delete-icon.png";

// 레시피 상세 컴포넌트
const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(""); // 현재 사용자 이름 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username"); // username 저장 위치

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchRecipe = () => {
      axios
        .get(`http://127.0.0.1:8000/recipes/${id}`, {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        })
        .then((response) => {
          const recipeData = response.data;
          setRecipe(recipeData);
          setIsAuthor(recipeData.author === storedUsername);
          setIsSaved(recipeData.isSaved); // Assuming `isSaved` is returned from API

          // 로그 출력
          console.log("Recipe Author:", recipeData.author);
          console.log("Current Username:", storedUsername);
          setLoading(false);
        })
        .catch((error) => {
          console.error("레시피 불러오기에 실패했습니다:", error);
          setError(error);
          setLoading(false);
        });
    };

    fetchRecipe();
  }, [id]);

  const onEditRecipe = (recipeId) => {
    navigate(`/edit/recipe/${recipeId}`);
  };

  const onDelete = (recipeId) => {
    if (window.confirm("이 레시피를 정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://127.0.0.1:8000/recipes/${recipeId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(() => {
          alert("레시피가 삭제되었습니다.");
          navigate("/"); // 홈 페이지로 리다이렉트
        })
        .catch((error) => {
          console.error("레시피 삭제에 실패했습니다:", error);
          alert("레시피 삭제에 실패했습니다.");
        });
    }
  };

  const onToggleSave = (recipeId) => {
    axios
      .post(
        `http://127.0.0.1:8000/recipes/${recipeId}/toggle-save`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        setIsSaved(response.data.isSaved);
      })
      .catch((error) => {
        console.error("레시피 저장 상태 변경에 실패했습니다:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (error) {
    return <div>Error loading recipe detail: {error.message}</div>; // 에러 발생 시 표시
  }

  if (!recipe) {
    return <div>Recipe not found</div>; // 레시피가 없는 경우 표시
  }

  // 조리 단계 데이터를 배열로 변환
  const steps = [];
  for (let i = 1; i <= 10; i++) {
    const image = recipe[`step${i}_image`];
    const description = recipe[`step${i}_description`];
    if (image || description) {
      steps.push({ image, description });
    }
  }

  // recipe.tags와 recipe.equipment이 배열이 아닐 경우를 대비해 기본값 처리
  const tags = Array.isArray(recipe.tags)
    ? recipe.tags.join(", ")
    : "태그 정보 없음";
  const equipment = Array.isArray(recipe.equipment)
    ? recipe.equipment.join(", ")
    : "조리도구 정보 없음";

  return (
    <div className="recipe-detail-container">
      {/* 사진 */}
      <div className="recipe-image-container">
        <img
          src={recipe.image || init_image}
          alt="대표사진"
          className="recipe-re-image"
        />
      </div>

      {/* 빵 이름 및 태그, 버튼 */}
      <div className="header-container">
        <div className="left-content">
          <div className="show_title">{recipe.title}</div>
          <div className="show_tag">{tags}</div>
        </div>
        <div className="recipe-buttons">
          {isAuthor ? (
            <>
              <button
                className="edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditRecipe(recipe.id);
                }}
              >
                <img src={editIcon} alt="수정하기" />
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(recipe.id);
                }}
              >
                <img src={deleteIcon} alt="삭제하기" />
              </button>
            </>
          ) : (
            <button
              className="save-btn"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(recipe.id);
              }}
            >
              <img
                src={isSaved ? savedIcon : unsavedIcon}
                alt={isSaved ? "저장됨" : "저장되지 않음"}
              />
            </button>
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
            <div className="time_show">{recipe.cookingTime || "시간 미정"}</div>
          </div>
          <div>
            <div className="cate_show">
              <img className="tool_img" src={toolIcon} alt="조리도구 아이콘" />
              조리도구
            </div>
            <div className="equi_show">{equipment}</div>
          </div>
        </div>
      </div>

      {/* 조리 단계 */}
      <div className="steps-container">
        <h2>Steps</h2>
        {steps.length > 0 ? (
          steps.map((step, index) => (
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
