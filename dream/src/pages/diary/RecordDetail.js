import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/RecordDetail.css";
import Picture from "../../assets/picture_button.png";

const ImageUploadComponent = ({ images, onAddImage, onRemoveImage }) => (
  <div className="image-upload-container">
    <input
      type="file"
      accept="image/*"
      id="file-input"
      onChange={(e) => {
        if (e.target.files.length) {
          onAddImage(URL.createObjectURL(e.target.files[0]));
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
            <img src={image} alt={`preview-${index}`} />
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

const RecordDetail = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [recordDate, setRecordDate] = useState(
    date ? new Date(date) : new Date()
  );
  const [images, setImages] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [breadName, setBreadName] = useState("");
  const [breadType, setBreadType] = useState("");
  const [recordContent, setRecordContent] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (date) {
      setRecordDate(new Date(date));
    }
  }, [date]);

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
    const recordDateString = recordDate.toISOString().split("T")[0];
    const record = {
      breadName,
      bakeryName: storeName,
      tags: breadType.split(",").map((tag) => tag.trim()),
      review: recordContent,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/reviews/${recordDateString}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [recordDateString]: [record],
          }),
        }
      );

      if (response.ok) {
        console.log("저장할 데이터:", record);
        navigate("/diary");
      } else {
        console.error("Failed to save record. Status code:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error saving record:", error);
    }
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
        rows="4"
      />
      <button className="save-button" onClick={handleSave}>
        ✔️ 저장하기
      </button>
    </div>
  );
};

export default RecordDetail;
