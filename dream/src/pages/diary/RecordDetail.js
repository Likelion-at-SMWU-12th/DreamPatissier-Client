import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Helper function for image handling
const ImageUpload = ({ images, onAddImage, onRemoveImage }) => (
  <div>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files.length) {
          onAddImage(URL.createObjectURL(e.target.files[0]));
        }
      }}
    />
    <div style={{ display: "flex", marginTop: "10px", flexWrap: "wrap" }}>
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={image}
            alt={`preview-${index}`}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <button
            onClick={() => onRemoveImage(index)}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              padding: "2px 6px",
              fontSize: "14px",
            }}
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
);

const RecordDetail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [recordDate, setRecordDate] = useState("");
  const [images, setImages] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [breadName, setBreadName] = useState("");
  const [breadType, setBreadType] = useState("");
  const [recordContent, setRecordContent] = useState("");

  useEffect(() => {
    if (date) {
      setRecordDate(date);
    }
  }, [date]);

  const handleDateChange = (e) => setRecordDate(e.target.value);
  const handleStoreNameChange = (e) => setStoreName(e.target.value);
  const handleBreadNameChange = (e) => setBreadName(e.target.value);
  const handleBreadTypeChange = (e) => setBreadType(e.target.value);
  const handleRecordContentChange = (e) => setRecordContent(e.target.value);

  const handleAddImage = (newImage) => {
    if (images.length < 3) {
      setImages([...images, newImage]);
    } else {
      alert("최대 3장까지만 등록할 수 있습니다.");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const record = {
      date: recordDate,
      images,
      storeName,
      breadName,
      breadType,
      recordContent,
    };

    navigate("/diary");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>기록 상세</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          날짜:
          <input
            type="date"
            value={recordDate}
            onChange={handleDateChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <ImageUpload
          images={images}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          가게 이름:
          <input
            type="text"
            value={storeName}
            onChange={handleStoreNameChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          빵 이름:
          <input
            type="text"
            value={breadName}
            onChange={handleBreadNameChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          웰니스 빵 종류:
          <input
            type="text"
            value={breadType}
            onChange={handleBreadTypeChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          기록 내용:
          <textarea
            value={recordContent}
            onChange={handleRecordContentChange}
            rows="4"
            cols="50"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        저장하기
      </button>
    </div>
  );
};

export default RecordDetail;
