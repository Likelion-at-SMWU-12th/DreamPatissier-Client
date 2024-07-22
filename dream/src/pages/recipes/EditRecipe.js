import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const fetchRecipeById = async (id) => {
  return {
    id,
    title: "단팥빵",
    tags: ["디저트", "빵"],
    equipment: ["오븐"],
    author: "user1",
    represent_img: "Bread_represent",
  };
};

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      const data = await fetchRecipeById(id);
      setRecipe(data);
    };
    getRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const handleSave = () => {
    navigate("/recipes");
  };

  return (
    <div>
      <h1>레시피 수정</h1>
      <p>레시피 ID: {recipe.id}</p>
      <div>
        <label>
          제목:
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          태그:
          <input
            type="text"
            value={recipe.tags.join(", ")}
            onChange={(e) =>
              setRecipe({ ...recipe, tags: e.target.value.split(", ") })
            }
          />
        </label>
      </div>
      <div>
        <label>
          장비:
          <input
            type="text"
            value={recipe.equipment.join(", ")}
            onChange={(e) =>
              setRecipe({ ...recipe, equipment: e.target.value.split(", ") })
            }
          />
        </label>
      </div>
      <div>
        <label>
          저자:
          <input
            type="text"
            value={recipe.author}
            onChange={(e) => setRecipe({ ...recipe, author: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          대표 이미지:
          <input
            type="text"
            value={recipe.represent_img}
            onChange={(e) =>
              setRecipe({ ...recipe, represent_img: e.target.value })
            }
          />
        </label>
      </div>
      <button onClick={handleSave}>저장</button>
      <button onClick={() => navigate("/recipes")}>돌아가기</button>
    </div>
  );
};

export default EditRecipe;
