import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Recipes.css";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import savedIcon from "../assets/saved-icon.png";
import unsavedIcon from "../assets/unsaved-icon.png";
import altIcon from "../assets/alt.png";

// 검색 바 컴포넌트
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    className="search"
    value={searchTerm}
    placeholder="조리도구 및 웰니스 키워드를 검색해주세요."
    onChange={(e) => setSearchTerm(e.target.value)} // 검색어 변경 시 호출
  />
);

// 개별 레시피 아이템 컴포넌트
const RecipeItem = ({
  recipe,
  currentUser,
  onToggleSave,
  savedRecipes,
  onDelete,
}) => {
  const isAuthor = recipe.author === currentUser; // 현재 사용자가 레시피의 작성자인지 여부
  const isSaved = savedRecipes.includes(recipe.id); // 레시피가 저장된 상태인지 여부
  const navigate = useNavigate();

  // 레시피 수정 페이지로 이동
  const handleEditRecipe = (e) => {
    e.stopPropagation();
    navigate(`/recipes/edit/${recipe.id}`);
  };

  // 레시피 상세 페이지로 이동
  const handleDetailRecipe = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  // 레시피 삭제 호출
  const handleDeleteRecipe = (e) => {
    e.stopPropagation();
    onDelete(recipe.id);
  };

  // 레시피 저장 상태 토글 호출
  const handleToggleSave = (e) => {
    e.stopPropagation();
    onToggleSave(recipe.id);
  };

  // 장비와 태그 리스트를 배열로 변환
  const equipmentList = Array.isArray(recipe.equipment) ? recipe.equipment : [];
  const tagsList = Array.isArray(recipe.tags) ? recipe.tags : [];

  return (
    <div className="recipe-item" onClick={handleDetailRecipe}>
      <img
        src={recipe.represent_img}
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="recipe-header">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-equipment">
          사용 조리기구: {equipmentList.join(", ")}
        </p>
      </div>
      <div className="recipe-footer">
        <p className="recipe-tags">태그: {tagsList.join(", ")}</p>
        <div className="recipe-buttons">
          {isAuthor ? (
            <>
              <button className="edit-btn" onClick={handleEditRecipe}>
                <img src={editIcon} alt="수정하기" />
              </button>
              <button className="delete-btn" onClick={handleDeleteRecipe}>
                <img src={deleteIcon} alt="삭제하기" />
              </button>
            </>
          ) : (
            <button className="save-btn" onClick={handleToggleSave}>
              <img src={isSaved ? savedIcon : unsavedIcon} alt="저장하기" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [savedRecipes, setSavedRecipes] = useState([]); // 저장된 레시피 목록 상태
  const [recipes, setRecipes] = useState([]); // 레시피 목록 상태
  const currentUser = "user1"; // 현재 사용자
  const navigate = useNavigate();

  useEffect(() => {
    // 레시피를 서버에서 가져오는 함수
    const fetchRecipes = () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      axios
        .get("http://127.0.0.1:8000/recipes/", {
          headers: {
            Authorization: `Bearer ${token}`, // 인증 헤더 설정
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const data = response.data;
            if (Array.isArray(data)) {
              const validatedData = data.map((recipe) => ({
                ...recipe,
                equipment: Array.isArray(recipe.equipment)
                  ? recipe.equipment
                  : [],
                tags: Array.isArray(recipe.tags) ? recipe.tags : [],
              }));
              setRecipes(validatedData); // 상태 업데이트
            } else {
              console.error("Data is not an array", data);
            }
          } else {
            console.error("Unexpected response status:", response.status);
          }
        })
        .catch((error) => {
          if (error.response) {
            // 서버 응답 오류
            console.error("Error fetching recipes:", error.response.data);
            console.error("Error status:", error.response.status);
          } else if (error.request) {
            // 요청은 했으나 응답 없음
            console.error("Error fetching recipes: No response received");
          } else {
            // 기타 오류
            console.error("Error fetching recipes:", error.message);
          }
        });
    };

    fetchRecipes(); // 컴포넌트 마운트 시 레시피 가져오기
  }, []);

  // 검색어에 맞게 레시피 필터링
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      recipe.equipment.some((equip) =>
        equip.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // 레시피 저장 상태 토글
  const handleToggleSave = (recipeId) => {
    setSavedRecipes((prevSaved) => {
      const updatedSaved = prevSaved.includes(recipeId)
        ? prevSaved.filter((id) => id !== recipeId)
        : [...prevSaved, recipeId];

      console.log(
        `레시피 ${recipeId}의 스크랩이 ${
          prevSaved.includes(recipeId) ? "취소되었습니다" : "되었습니다"
        }.`
      );

      return updatedSaved;
    });
  };

  // 레시피 삭제
  const handleDeleteRecipe = (recipeId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    axios
      .delete(`http://127.0.0.1:8000/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );
        console.log(`레시피 ${recipeId}이(가) 삭제되었습니다.`);
      })
      .catch((error) => {
        if (error.response) {
          // 서버 응답 오류
          console.error("Error deleting recipe:", error.response.data);
          console.error("Error status:", error.response.status);
        } else if (error.request) {
          // 요청은 했으나 응답 없음
          console.error("Error deleting recipe: No response received");
        } else {
          // 기타 오류
          console.error("Error deleting recipe:", error.message);
        }
      });
  };

  // 레시피 추가 페이지로 이동
  const handleAddRecipe = () => {
    navigate("/recipes/write");
  };

  return (
    <div className="container">
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            currentUser={currentUser}
            onToggleSave={handleToggleSave}
            savedRecipes={savedRecipes}
            onDelete={handleDeleteRecipe}
          />
        ))
      ) : (
        <div className="no-recipes-message">
          <img src={altIcon} alt="No Recipes" />
          <p>레시피가 없습니다. 검색어를 변경해 보세요.</p>
        </div>
      )}
      <button className="add-recipe-btn" onClick={handleAddRecipe}>
        ✏️ 등록하기
      </button>
    </div>
  );
};

export default Recipes;
