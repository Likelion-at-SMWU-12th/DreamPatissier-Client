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
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

// 레시피 항목 컴포넌트
const RecipeItem = ({
  recipe,
  currentUser,
  onToggleSave,
  isSaved,
  onDelete,
}) => {
  const isAuthor = recipe.author === currentUser;
  const navigate = useNavigate();

  const handleEditRecipe = (e) => {
    e.stopPropagation();
    navigate(`/recipes/edit/${recipe.id}`);
  };

  const handleDetailRecipe = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  const handleDeleteRecipe = (e) => {
    e.stopPropagation();
    onDelete(recipe.id);
  };

  const handleToggleSave = (e) => {
    e.stopPropagation();
    onToggleSave(recipe.id);
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
              <button className="delete-btn" onClick={handleDeleteRecipe}>
                <img src={deleteIcon} alt="삭제하기" />
              </button>
            </>
          ) : (
            <button className="save-btn" onClick={handleToggleSave}>
              <img
                src={isSaved ? savedIcon : unsavedIcon}
                alt={isSaved ? "저장됨" : "저장되지 않음"}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 레시피 목록 컴포넌트
const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState("");

  const currentUser = localStorage.getItem("nickname");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    // 로컬 저장소에서 저장된 레시피 ID 목록을 가져옴
    const loadSavedRecipes = () => {
      const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
      setSavedRecipes(saved);
    };

    // 서버에서 레시피를 가져옴
    const fetchRecipes = () => {
      if (!storedToken) return;

      axios
        .get("http://127.0.0.1:8000/recipes/", {
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
                  equipment: Array.isArray(recipe.equipment)
                    ? recipe.equipment
                    : [],
                  tags: Array.isArray(recipe.tags) ? recipe.tags : [],
                }))
              );
            } else {
              console.error("Data is not an array", data);
            }
          } else {
            console.error("Unexpected response status:", response.status);
          }
        })
        .catch(handleError);
    };

    loadSavedRecipes();
    fetchRecipes();
  }, []);

  const handleError = (error) => {
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
  };

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

  const handleToggleSave = (recipeId) => {
    setSavedRecipes((prevSaved) => {
      const updatedSaved = prevSaved.includes(recipeId)
        ? prevSaved.filter((id) => id !== recipeId)
        : [...prevSaved, recipeId];

      localStorage.setItem("savedRecipes", JSON.stringify(updatedSaved));

      console.log(
        `레시피 ${recipeId}의 스크랩이 ${
          prevSaved.includes(recipeId) ? "취소되었습니다" : "되었습니다"
        }.`
      );

      return updatedSaved;
    });
  };

  const handleDeleteRecipe = (recipeId) => {
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    axios
      .delete(`http://127.0.0.1:8000/recipes/${recipeId}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId)
        );
        console.log(`레시피 ${recipeId}이(가) 삭제되었습니다.`);
      })
      .catch(handleError);
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
            isSaved={savedRecipes.includes(recipe.id)}
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
