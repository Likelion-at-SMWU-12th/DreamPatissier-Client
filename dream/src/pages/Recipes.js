import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Recipes.css";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import savedIcon from "../assets/saved-icon.png";
import unsavedIcon from "../assets/unsaved-icon.png";
import altIcon from "../assets/alt.png";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <input
    type="text"
    className="search"
    value={searchTerm}
    placeholder="조리도구 및 웰니스 키워드를 검색해주세요."
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

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

  const handleEditRecipe = () => {
    navigate(`/recipes/edit/${recipe.id}`);
  };

  const handleDetailRecipe = () => {
    navigate(`/recipes/${recipe.id}`);
  };

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
              <img src={isSaved ? savedIcon : unsavedIcon} alt="저장하기" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const currentUser = "user1";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3001/recipes");
        const data = await response.json();
        const validatedData = data.map((recipe) => ({
          ...recipe,
          equipment: Array.isArray(recipe.equipment) ? recipe.equipment : [],
          tags: Array.isArray(recipe.tags) ? recipe.tags : [],
        }));
        setRecipes(validatedData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
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

      console.log(
        `레시피 ${recipeId}의 스크랩이 ${
          prevSaved.includes(recipeId) ? "취소되었습니다" : "되었습니다"
        }.`
      );

      return updatedSaved;
    });
  };

  const handleDeleteRecipe = (recipeId) => {
    const deleteRecipe = async () => {
      try {
        await fetch(`http://localhost:3001/recipes/${recipeId}`, {
          method: "DELETE",
        });
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );
        console.log(`레시피 ${recipeId}이(가) 삭제되었습니다.`);
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    };

    deleteRecipe();
  };

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
          <img src={altIcon}></img>
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
