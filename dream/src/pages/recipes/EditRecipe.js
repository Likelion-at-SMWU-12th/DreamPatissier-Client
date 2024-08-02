import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/WriteRecipe.css";
import representPicture from "./represent_picture.png";
import init_image from "./init_recipe_image.png";

const ImageComponent = ({ image, onImageChange }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="picture_re_input"
      onClick={handleImageClick}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onImageChange}
      />
      <img src={image} alt="대표사진" className="image-preview" />
    </div>
  );
};

const StepComponent = ({ step, index, onStepChange, onStepImageChange }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="recipe-step" key={index}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => onStepImageChange(index, e)}
      />
      <div className="image-container" onClick={handleImageClick}>
        <img
          src={
            step.imageFile ? URL.createObjectURL(step.imageFile) : init_image
          }
          alt={`조리 단계 ${index + 1} 사진`}
          className="image-preview"
        />
      </div>
      <textarea
        rows="9"
        className="text-explain"
        placeholder="조리방법"
        value={step.description}
        onChange={(e) => onStepChange(index, "description", e.target.value)}
      />
    </div>
  );
};

const WriteRecipe = () => {
  const { recipeId } = useParams(); // URL에서 recipeId를 가져옵니다
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [image, setImage] = useState(representPicture);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [equipment, setEquipment] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [steps, setSteps] = useState(
    Array(10).fill({ description: "", imageFile: null })
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (recipeId) {
      axios
        .get(`http://127.0.0.1:8000/recipes/${recipeId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const recipeData = response.data;
          setImage(recipeData.represent_img || representPicture);
          setImageFile(null);
          setTitle(recipeData.title || "");
          setTags(recipeData.tags.join(", ") || "");
          setCookingTime(recipeData.cookingTime || "");
          setEquipment(recipeData.equipment || "");
          setIngredients(recipeData.ingredients || [{ name: "", amount: "" }]);
          setSteps(
            recipeData.steps.map((step) => ({
              description: step.description,
              imageFile: null,
            })) || Array(10).fill({ description: "", imageFile: null })
          );
        })
        .catch((error) => {
          console.error("레시피 정보를 불러오는 데 실패했습니다:", error);
          alert("레시피 정보를 불러오는 데 실패했습니다.");
        });
    }
  }, [recipeId, token]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setSteps(updatedSteps);
  };

  const handleStepImageChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedSteps = [...steps];
      updatedSteps[index] = { ...updatedSteps[index], imageFile: file };
      setSteps(updatedSteps);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !tags || !cookingTime || !equipment || !imageFile) {
      alert("모든 필드를 작성해 주세요.");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("image", imageFile);
    if (title) formData.append("title", title);
    if (tags) formData.append("tags", tags);
    if (cookingTime) formData.append("cookingTime", cookingTime);
    if (equipment) formData.append("equipment", equipment);
    if (ingredients)
      formData.append("ingredients", JSON.stringify(ingredients));

    steps.forEach((step, index) => {
      if (step.imageFile) {
        formData.append(`step${index + 1}_image`, step.imageFile);
      }
      formData.append(`step${index + 1}_description`, step.description);
    });

    const authorUsername = localStorage.getItem("username"); // 사용자 이름을 로컬 스토리지에서 가져옵니다
    formData.append("author", authorUsername);

    axios
      .put(`http://127.0.0.1:8000/recipes/${recipeId}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("서버 응답 데이터:", response.data);
        alert("레시피가 수정되었습니다!");
        navigate("/recipes");
      })
      .catch((error) => {
        if (error.response) {
          console.error("서버 응답 데이터:", error.response.data);
          console.error("서버 응답 상태:", error.response.status);
          console.error("서버 응답 헤더:", error.response.headers);
          alert(
            `서버 오류: ${
              error.response.data.author || "알 수 없는 오류가 발생했습니다."
            }`
          );
        } else if (error.request) {
          console.error(
            "서버에 요청을 보냈지만 응답이 없습니다:",
            error.request
          );
          alert("서버에 요청을 보냈지만 응답이 없습니다.");
        } else {
          console.error("요청 설정 중 오류 발생:", error.message);
          alert("요청 설정 중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <ImageComponent image={image} onImageChange={handleImageChange} />
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
          value={tags}
          placeholder="#웰니스 키워드를 작성해 주세요."
          onChange={(e) => setTags(e.target.value)}
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
          value={equipment}
          placeholder="조리기구를 하나만 작성해 주세요. (전자레인지/오븐/에어프라이어 등)"
          onChange={(e) => setEquipment(e.target.value)}
        />

        <div className="style2">
          <div>
            <div className="writerecipe-title">재료</div>
            {ingredients.map((ingredient, index) => (
              <div className="ingredient-div" key={index}>
                <input
                  type="text"
                  placeholder="재료명"
                  value={ingredient.name}
                  onChange={(e) =>
                    setIngredients((prevIngredients) =>
                      prevIngredients.map((ing, i) =>
                        i === index ? { ...ing, name: e.target.value } : ing
                      )
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="수량"
                  value={ingredient.amount}
                  onChange={(e) =>
                    setIngredients((prevIngredients) =>
                      prevIngredients.map((ing, i) =>
                        i === index ? { ...ing, amount: e.target.value } : ing
                      )
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
          </div>
          <div className="recipe-step-container">
            {steps.map((step, index) => (
              <StepComponent
                key={index}
                step={step}
                index={index}
                onStepChange={handleStepChange}
                onStepImageChange={handleStepImageChange}
              />
            ))}
          </div>
        </div>
        <button className="recipe-save-button" type="submit">
          레시피 수정하기
        </button>
      </form>
    </div>
  );
};

export default WriteRecipe;
