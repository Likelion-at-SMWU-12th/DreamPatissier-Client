import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/RecordDetail.css";
import Picture from "../../assets/picture_button.png";
import axios from "axios";

const ImageUploadComponent = ({ images, onAddImage, onRemoveImage }) => (
  <div className="image-upload-container">
    <input
      type="file"
      accept="image/*"
      id="file-input"
      onChange={(e) => {
        if (e.target.files.length) {
          onAddImage(e.target.files[0]);
        }
      }}
      style={{ display: "none" }}
    />
    <div className="image-upload-row">
      <label htmlFor="file-input">
        <img src={Picture} alt="Upload" className="upload-button" />
      </label>
      <div className="image-preview-scroll">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(image)} alt={`preview-${index}`} />
            <button
              onClick={() => onRemoveImage(index)}
              aria-label="Remove image"
              className="remove-button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const formatDate = (date) => {
  if (!date) return "";

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = dayNames[date.getDay()];

  return `${year}년 ${month.toString().padStart(2, "0")}월 ${day
    .toString()
    .padStart(2, "0")}일 (${dayName})`;
};

const EditRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recordDate, setRecordDate] = useState(new Date());
  const [images, setImages] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [breadName, setBreadName] = useState("");
  const [breadType, setBreadType] = useState("");
  const [recordContent, setRecordContent] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/diary/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const record = response.data;
          setRecordDate(new Date(record.date));
          setStoreName(record.bakery_name || "");
          setBreadName(record.bread_name || "");
          setBreadType((record.tags || []).join(", "));
          setRecordContent(record.review || "");

          // Initialize images array with existing image URLs
          setImages(Array.isArray(record.img_src) ? record.img_src : []);
        })
        .catch((error) => console.error("Error fetching record:", error));
    }
  }, [id, token]);

  const handleDateChange = (date) => {
    if (date) {
      setRecordDate(date);
    }
    setIsDatePickerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddImage = (file) => {
    if (images.length < 3) {
      setImages([...images, file]);
    } else {
      alert("최대 3장까지만 등록할 수 있습니다.");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const recordDateString = recordDate.toISOString().split("T")[0];
    const formData = new FormData();
    formData.append("date", recordDateString);
    formData.append("bread_name", breadName);
    formData.append("bakery_name", storeName);
    formData.append(
      "tags",
      JSON.stringify(breadType.split(",").map((tag) => tag.trim()))
    );
    formData.append("review", recordContent);

    images.forEach((image, index) => {
      formData.append(`img_src${index + 1}`, image);
    });

    axios
      .put(`http://127.0.0.1:8000/diary/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/diary");
        } else {
          console.error("Failed to save record. Status code:", response.status);
          console.error("Error details:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error saving record:", error);
      });
  };

  return (
    <div className="diary-form">
      <label>
        <div className="date-input-container" ref={datePickerRef}>
          <div
            className="formatted-date"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            {recordDate ? formatDate(recordDate) : "날짜를 선택하세요"}
          </div>
          {isDatePickerOpen && (
            <div className="date-picker-popup">
              <DatePicker
                showPopperArrow={false}
                selected={recordDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          )}
        </div>
      </label>
      <hr />
      <ImageUploadComponent
        images={images}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
      />
      <div className="review-images">
        {images.map((img_src, index) => (
          <img
            key={index}
            src={
              typeof img_src === "string"
                ? img_src
                : URL.createObjectURL(img_src)
            }
            alt={`review-${index}`}
            className="review-show-image"
            onLoad={() => {
              if (typeof img_src !== "string") {
                URL.revokeObjectURL(img_src);
              }
            }}
          />
        ))}
      </div>
      <input
        className="input_data"
        type="text"
        value={storeName}
        placeholder="기록할 빵집/브랜드의 이름을 작성해 주세요."
        onChange={(e) => setStoreName(e.target.value)}
      />
      <input
        className="input_data"
        type="text"
        value={breadName}
        placeholder="기록할 빵의 이름을 작성해 주세요. (예시: 식물성, 저당)"
        onChange={(e) => setBreadName(e.target.value)}
      />
      <input
        className="input_data"
        type="text"
        value={breadType}
        placeholder="어떤 웰니스 빵인가요?"
        onChange={(e) => setBreadType(e.target.value)}
      />
      <textarea
        className="input_data"
        value={recordContent}
        placeholder="맛평가 등 기록하고 싶은 내용을 작성해 주세요."
        onChange={(e) => setRecordContent(e.target.value)}
        rows="10"
      />
      <button className="save-button" onClick={handleSave}>
        ✔️ 저 장
      </button>
    </div>
  );
};

export default EditRecord;
