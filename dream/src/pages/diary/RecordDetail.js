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
      className="input_picture"
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
    <div className="image-info">
      {images.length > 0 ? `${images.length}장 추가됨` : "사진을 추가해주세요"}
    </div>
  </div>
);

// 날짜 포맷팅 함수
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

// 메인 컴포넌트
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

  // 날짜 파라미터가 있을 때 상태 업데이트
  useEffect(() => {
    if (date) {
      setRecordDate(new Date(date));
    }
  }, [date]);

  // 날짜 선택 핸들러
  const handleDateChange = (date) => {
    if (date) {
      console.log("타임피커에서 선택된 날짜:", date);
      setRecordDate(date);
    }
    setIsDatePickerOpen(false);
  };

  // 날짜 선택기 외부 클릭 시 닫기
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

  // 이미지 추가 핸들러
  const handleAddImage = (newImage) => {
    if (images.length < 3) {
      setImages([...images, newImage]);
    } else {
      alert("최대 3장까지만 등록할 수 있습니다.");
    }
  };

  // 이미지 제거 핸들러
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // 저장 핸들러
  const handleSave = async () => {
    const record = {
      date: recordDate,
      images,
      storeName,
      breadName,
      breadType,
      recordContent,
    };

    // 로그 찍기: 저장할 데이터
    console.log("저장할 데이터:", record);

    navigate("/diary");
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

      <label>
        가게 이름:
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </label>

      <label>
        빵 이름:
        <input
          type="text"
          value={breadName}
          onChange={(e) => setBreadName(e.target.value)}
        />
      </label>

      <label>
        웰니스 빵 종류:
        <input
          type="text"
          value={breadType}
          onChange={(e) => setBreadType(e.target.value)}
        />
      </label>

      <label>
        기록 내용:
        <textarea
          value={recordContent}
          onChange={(e) => setRecordContent(e.target.value)}
          rows="4"
          cols="50"
        />
      </label>

      <button className="save-button" onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
};

export default RecordDetail;
