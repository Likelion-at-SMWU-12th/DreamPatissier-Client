import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/WriteRecipe.css";
import representPicture from "./represent_picture.png";
import init_image from "./init_recipe_image.png";

const mockUser = {
  id: "12345",
};

const WriteRecipe = () => {
  const [image, setImage] = useState(representPicture);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([""]);
  const [cookingTime, setCookingTime] = useState("");
  const [equipment, setEquipment] = useState([""]);
  const [ingredients, setIngredients] = useState([{ item: "", quantity: "" }]);
  const [steps, setSteps] = useState([{ image: "", description: "" }]);
  const [user, setUser] = useState(mockUser);

  const fileInputRef = useRef(null);
  const stepFileInputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      steps.forEach((step) => {
        if (step.image && step.image.startsWith("blob:")) {
          URL.revokeObjectURL(step.image);
        }
      });
    };
  }, [steps]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { item: "", quantity: "" }]);
  };

  const addStep = () => {
    setSteps([...steps, { image: "", description: "" }]);
  };

  const handleChange = (index, field, value, array, setArray) => {
    const newArray = [...array];
    newArray[index][field] = value;
    setArray(newArray);
  };

  const handleStepImageChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      const newSteps = [...steps];
      newSteps[index].image = newImageUrl;
      setSteps(newSteps);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !tags.length || !cookingTime || !equipment.length || !image) {
      alert("모든 필드를 작성해 주세요.");
      return;
    }

    const recipeData = {
      author: user.id,
      represent_img: image,
      title,
      tags,
      cookingTime,
      equipment,
      ingredients,
      steps,
    };

    try {
      await axios.post("/recipes", recipeData);
      alert("레시피가 등록되었습니다!");
      navigate("/recipes");
    } catch (error) {
      console.error("레시피 등록에 실패했습니다:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div
          className="picture_re_input"
          onClick={handleImageClick}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <img src={image} alt="대표사진" className="image-preview" />
        </div>
        <input
          className="input-recipe-data"
          type="text"
          value={title}
          placeholder="레시피명을 작성해 주세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input-recipe-data"
          type="text"
          value={tags.join(", ")}
          placeholder="#웰니스 키워드를 작성해 주세요."
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
        />
        <input
          className="input-recipe-data"
          type="text"
          value={cookingTime}
          placeholder="조리시간을 작성해 주세요."
          onChange={(e) => setCookingTime(e.target.value)}
        />
        <input
          className="input-recipe-data"
          type="text"
          value={equipment.join(", ")}
          placeholder="조리기구를 하나만 작성해 주세요. (전자레인지/오븐/에어프라이어 등)"
          onChange={(e) =>
            setEquipment(e.target.value.split(",").map((eq) => eq.trim()))
          }
        />

        <div className="style2">
          <div>
            <div className="writerecipe-title">재료</div>
            {ingredients.map((ingredient, index) => (
              <div className="ingredient-div" key={index}>
                <input
                  type="text"
                  placeholder="재료명"
                  value={ingredient.item}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "item",
                      e.target.value,
                      ingredients,
                      setIngredients
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="수량"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "quantity",
                      e.target.value,
                      ingredients,
                      setIngredients
                    )
                  }
                />
              </div>
            ))}
            <button
              className="add-gredient-btn"
              type="button"
              onClick={addIngredient}
            >
              ➕ 항목 추가
            </button>
          </div>
          <div className="recipe-step-header">
            <div className="writerecipe-title2">조리방법</div>
            <button className="step-add-button" type="button" onClick={addStep}>
              ➕ 단계 추가
            </button>
          </div>
          <div className="recipe-step-container">
            {steps.map((step, index) => (
              <div className="recipe-step" key={index}>
                <input
                  type="file"
                  ref={(el) => (stepFileInputRefs.current[index] = el)}
                  style={{ display: "none" }}
                  onChange={(e) => handleStepImageChange(index, e)}
                />
                <div
                  className="image-container"
                  onClick={() => stepFileInputRefs.current[index].click()}
                >
                  <img
                    src={step.image || init_image}
                    alt="조리 단계 사진"
                    className="image-preview"
                  />
                </div>
                <textarea
                  rows="9"
                  className="text-explain"
                  placeholder="조리방법"
                  value={step.description}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "description",
                      e.target.value,
                      steps,
                      setSteps
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <button className="recipe-save-button" type="submit">
          레시피 등록하기
        </button>
      </form>
    </div>
  );
};

export default WriteRecipe;
