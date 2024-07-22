import React, { useState } from "react";
import "../styles/Recipes.css";
import Bread_represent from "../assets/bread_re.png";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import saveIcon from "../assets/save-icon.png";

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

const RecipeItem = ({ recipe, currentUser }) => {
  const isAuthor = recipe.author === currentUser;

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
              <button className="edit-btn">
                <img src={editIcon} alt="수정하기" />
              </button>
              <button className="delete-btn">
                <img src={deleteIcon} alt="삭제하기" />
              </button>
            </>
          ) : (
            <button className="save-btn">
              <img src={saveIcon} alt="저장하기" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = "user1"; // 현재 로그인한 사용자 예시

  const filteredRecipes = mockRecipes.filter(
    (recipe) =>
      recipe.title.includes(searchTerm) ||
      recipe.tags.some((tag) => tag.includes(searchTerm)) ||
      recipe.equipment.some((equip) => equip.includes(searchTerm))
  );

  return (
    <div className="container">
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {filteredRecipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default Recipes;
