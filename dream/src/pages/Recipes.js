import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Recipes.css";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import savedIcon from "../assets/saved-icon.png";
import unsavedIcon from "../assets/unsaved-icon.png";

// SearchBar 컴포넌트
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className="search"
      value={searchTerm}
      placeholder="조리도구 및 웰니스 키워드를 검색해주세요."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

// RecipeItem 컴포넌트
const RecipeItem = ({
  recipe,
  currentUser,
  onToggleSave,
  savedRecipes,
  onDelete,
}) => {
  const isAuthor = recipe.author === currentUser;
  const isSaved = savedRecipes.includes(recipe.id);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  // 배열이 아닌 경우 빈 배열로 설정
  const equipmentList = Array.isArray(recipe.equipment) ? recipe.equipment : [];
  const tagsList = Array.isArray(recipe.tags) ? recipe.tags : [];

  return (
    <div className="recipe-item">
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
              <button className="edit-btn" onClick={handleEdit}>
                <img src={editIcon} alt="수정하기" />
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete(recipe.id)}
              >
                <img src={deleteIcon} alt="삭제하기" />
              </button>
            </>
          ) : (
            <button
              className="save-btn"
              onClick={() => onToggleSave(recipe.id)}
            >
              <img src={isSaved ? savedIcon : unsavedIcon} alt="저장하기" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Recipes 컴포넌트
const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const currentUser = "user1";
  const navigate = useNavigate();

  useEffect(() => {
    // API를 통해 레시피 데이터를 가져옴
    fetch("http://localhost:3001/recipes")
      .then((response) => response.json())
      .then((data) => {
        // 데이터 검증 및 변환
        const validatedData = data.map((recipe) => ({
          ...recipe,
          equipment: Array.isArray(recipe.equipment) ? recipe.equipment : [],
          tags: Array.isArray(recipe.tags) ? recipe.tags : [],
        }));
        setRecipes(validatedData);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.includes(searchTerm) ||
      recipe.tags.some((tag) => tag.includes(searchTerm)) ||
      recipe.equipment.some((equip) => equip.includes(searchTerm))
  );

  const handleToggleSave = (recipeId) => {
    setSavedRecipes((prevSaved) => {
      const updatedSaved = prevSaved.includes(recipeId)
        ? prevSaved.filter((id) => id !== recipeId)
        : [...prevSaved, recipeId];

      if (prevSaved.includes(recipeId)) {
        console.log(`레시피 ${recipeId}의 스크랩이 취소되었습니다.`);
      } else {
        console.log(`레시피 ${recipeId}이(가) 스크랩되었습니다.`);
      }

      return updatedSaved;
    });
  };

  const handleDeleteRecipe = (recipeId) => {
    fetch(`http://localhost:3001/recipes/${recipeId}`, {
      method: "DELETE",
    })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );
        console.log(`레시피 ${recipeId}이(가) 삭제되었습니다.`);
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };

  const handleAddRecipe = () => {
    navigate("/recipes/write");
  };

  return (
    <div className="container">
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {filteredRecipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          currentUser={currentUser}
          onToggleSave={handleToggleSave}
          savedRecipes={savedRecipes}
          onDelete={handleDeleteRecipe}
        />
      ))}
      <button className="add-recipe-btn" onClick={handleAddRecipe}>
        ✏️ 등록하기
      </button>
    </div>
  );
};

export default Recipes;
