import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Recipes.css";
import Bread_represent from "../assets/bread_re.png";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import savedIcon from "../assets/saved-icon.png";
import unsavedIcon from "../assets/unsaved-icon.png";

const mockRecipes = [
  {
    id: 1,
    title: "단팥빵",
    tags: ["디저트", "빵"],
    equipment: ["오븐"],
    author: "user1",
    represent_img: Bread_represent,
  },
  {
    id: 2,
    title: "바게트",
    tags: ["빵"],
    equipment: ["오븐"],
    author: "user2",
    represent_img: Bread_represent,
  },
  {
    id: 3,
    title: "크로와상",
    tags: ["디저트", "빵"],
    equipment: ["오븐"],
    author: "user1",
    represent_img: Bread_represent,
  },
];

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
          사용 조리기구: {recipe.equipment.join(", ")}
        </p>
      </div>
      <div className="recipe-footer">
        <p className="recipe-tags">태그: {recipe.tags.join(", ")}</p>
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

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState(mockRecipes);
  const currentUser = "user1";
  const navigate = useNavigate();

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
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
    console.log(`레시피 ${recipeId}이(가) 삭제되었습니다.`);
  };

  const handleAddRecipe = () => {
    navigate("/recipes");
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
