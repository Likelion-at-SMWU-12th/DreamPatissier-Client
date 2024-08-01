import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/RecordDetail.css";
import Picture from "../../assets/picture_button.png";
import axios from "axios";

// 이미지 업로드 및 미리보기 컴포넌트
const ImageComponent = ({
  images,
  onAddImage,
  onRemoveImage,
  serverImages,
  onDeleteServerImage,
}) => (
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
        {/* 서버 이미지 표시 */}
        {serverImages.length > 0 && (
          <div className="server-images">
            {serverImages.map((image, index) => (
              <div key={index} className="image-preview">
                <img src={image.url} alt={`server-preview-${index}`} />
                <button
                  onClick={() => onDeleteServerImage(index)}
                  aria-label="Remove image"
                  className="remove-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {/* 사용자 업로드 이미지 표시 */}
        {images.length > 0 && (
          <div className="user-images">
            {images.map((image, index) => (
              <div key={index} className="image-preview">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                />
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
        )}
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
  const [serverImages, setServerImages] = useState([]);
  const [deletedImageFields, setDeletedImageFields] = useState([]);
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
          headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
          const record = response.data;
          setRecordDate(new Date(record.date));
          setStoreName(record.bakery_name || "");
          setBreadName(record.bread_name || "");
          setBreadType((record.tags || []).join(", "));
          setRecordContent(record.review || "");

          // 서버 이미지 URL 초기화
          setServerImages(
            [
              { url: record.img_src1, field: "img_src1" },
              { url: record.img_src2, field: "img_src2" },
              { url: record.img_src3, field: "img_src3" },
            ].filter((img) => img.url)
          );
        })
        .catch((error) => console.error("Error fetching record:", error));
    }
  }, [id, token]);

  const handleDateChange = (date) => {
    if (date) setRecordDate(date);
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

  const handleDeleteServerImage = (index) => {
    const field = serverImages[index].field;
    setDeletedImageFields([...deletedImageFields, field]);
    setServerImages(serverImages.filter((_, i) => i !== index));
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

    // 서버 이미지 상태에서 제거된 이미지를 서버에 반영
    deletedImageFields.forEach((field) => {
      formData.append(field, "");
    });

    // 새로운 이미지 추가
    images.forEach((image, index) => {
      formData.append(`img_src${index + 1}`, image);
    });

    axios
      .put(`http://127.0.0.1:8000/diary/${id}/`, formData, {
        headers: { Authorization: `Token ${token}` },
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
      {/* 이미지 업로드 및 미리보기 컴포넌트 */}
      <ImageComponent
        images={images}
        onAddImage={handleAddImage}
        onRemoveImage={handleRemoveImage}
        serverImages={serverImages}
        onDeleteServerImage={handleDeleteServerImage}
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
        rows="10"
      />
      <button className="save-button" onClick={handleSave}>
        ✔️ 저 장
      </button>
    </div>
  );
};

export default EditRecord;
