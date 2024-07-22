import React, { useState } from "react";
import "../styles/Recipes.css";
import Bread_represent from "../assets/bread_re.png";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import savedIcon from "../assets/saved-icon.png";
import unsavedIcon from "../assets/unsaved-icon.png";

// 더미 레시피 데이터
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

// 검색 바 컴포넌트
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

// 개별 레시피 아이템 컴포넌트
const RecipeItem = ({ recipe, currentUser, onToggleSave, savedRecipes }) => {
  const isAuthor = recipe.author === currentUser; // 현재 사용자와 레시피 작성자 비교
  const isSaved = savedRecipes.includes(recipe.id); // 레시피가 스크랩 되어있는지 여부

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
            // 현재 사용자가 레시피 작성자일 때만 수정 및 삭제 버튼 표시
            <>
              <button className="edit-btn">
                <img src={editIcon} alt="수정하기" />
              </button>
              <button className="delete-btn">
                <img src={deleteIcon} alt="삭제하기" />
              </button>
            </>
          ) : (
            // 현재 사용자가 레시피 작성자가 아닐 때 스크랩 버튼 표시
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

// 레시피 목록 컴포넌트
const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [savedRecipes, setSavedRecipes] = useState([]); // 스크랩된 레시피 상태
  const currentUser = "user1"; // 현재 로그인한 사용자 예시

  // 검색어에 따라 필터링된 레시피 목록
  const filteredRecipes = mockRecipes.filter(
    (recipe) =>
      recipe.title.includes(searchTerm) ||
      recipe.tags.some((tag) => tag.includes(searchTerm)) ||
      recipe.equipment.some((equip) => equip.includes(searchTerm))
  );

  // 스크랩 상태를 토글하는 함수
  const handleToggleSave = (recipeId) => {
    setSavedRecipes((prevSaved) => {
      const updatedSaved = prevSaved.includes(recipeId)
        ? prevSaved.filter((id) => id !== recipeId) // 이미 스크랩된 레시피는 제거
        : [...prevSaved, recipeId]; // 스크랩되지 않은 레시피는 추가

      // 로그 출력
      if (prevSaved.includes(recipeId)) {
        console.log(`레시피 ${recipeId}의 스크랩이 취소되었습니다.`);
      } else {
        console.log(`레시피 ${recipeId}이(가) 스크랩되었습니다.`);
      }

      return updatedSaved;
    });
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
        />
      ))}
    </div>
  );
};

export default Recipes;
