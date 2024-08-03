import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Recipes.css";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import savedIcon from "../assets/saved-icon.png";
import unsavedIcon from "../assets/unsaved-icon.png";
import altIcon from "../assets/alt.png";
import toolIcon from "../assets/tool2.png";

// 에러 핸들링 함수
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
  onDetailRecipe,
  onEditRecipe,
}) => {
  const isAuthor = recipe.is_owner;

  return (
    <div className="recipe-item" onClick={() => onDetailRecipe(recipe.id)}>
      <img
        src={recipe.image || altIcon}
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="recipe-header">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="recipe-container">
          <img src={toolIcon} alt="수정하기" className="tool-icon" />
          <p className="recipe-equipment">{recipe.equipment}</p>
        </div>
      </div>
      <div className="recipe-footer">
        <p className="recipe-tags">{recipe.tags.join(", ")}</p>
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
    </div>
  );
};

// 레시피 목록 및 레시피 항목을 포함하는 컴포넌트
const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  const currentUser = localStorage.getItem("nickname");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  useEffect(() => {
    if (!token) return;

    // Load saved recipes
    axios
      .get("http://127.0.0.1:8000/users/saved-recipes/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setSavedRecipes(response.data);
          localStorage.setItem("savedRecipes", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        handleError(error);
      });

    // Fetch recipes
    axios
      .get("http://127.0.0.1:8000/recipes/", {
        headers: {
          Authorization: `Token ${token}`,
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
              }))
            );
          } else {
            console.error("Data is not an array", data);
          }
        } else {
          console.error("Unexpected response status:", response.status);
        }
      })
      .catch((error) => {
        setError(error); // 에러 상태 업데이트
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 종료
      });
  }, [token]); // 의존성 배열에 token 추가

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
    axios
      .post(
        `http://127.0.0.1:8000/users/saved-recipes/${recipeId}`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
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
      })
      .catch((error) => {
        handleError(error);
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
      .catch((error) => {
        handleError(error);
      });
  };

  const handleAddRecipe = () => {
    navigate("/recipes/write");
  };

  const handleDetailRecipe = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleEditRecipe = (recipeId) => {
    navigate(`/recipes/edit/${recipeId}`);
  };

  return (
    <div className="container">
      <div className="search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {loading ? (
        <div className="loading-message">Loading...</div> // 로딩 상태 표시
      ) : error ? (
        <div className="error-message">
          Error loading recipes: {error.message}
        </div> // 에러 상태 표시
      ) : filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            currentUser={currentUser}
            onToggleSave={handleToggleSave}
            isSaved={savedRecipes.includes(recipe.id)}
            onDelete={handleDeleteRecipe}
            onDetailRecipe={handleDetailRecipe}
            onEditRecipe={handleEditRecipe}
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
