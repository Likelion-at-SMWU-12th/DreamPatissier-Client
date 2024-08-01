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
  const [token, setToken] = useState(localStorage.getItem("token"));
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
      setImages((prevImages) => {
        const updatedImages = [...prevImages, newImage];
        console.log("이미지 추가됨:", newImage);
        return updatedImages;
      });
    } else {
      alert("최대 3장까지만 등록할 수 있습니다.");
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      console.log("이미지 제거됨, 인덱스:", index);
      return updatedImages;
    });
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

    images.forEach((image) => {
      formData.append("img_src", image);
    });

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    axios
      .post("http://127.0.0.1:8000/diary/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("기록이 성공적으로 저장되었습니다!");
          console.log("서버 응답 데이터:", response.data);
          navigate("/diary");
        } else {
          console.error(
            "기록 저장에 실패했습니다. 상태 코드:",
            response.status
          );
          console.error("오류 세부 사항:", response.data);
        }
      })
      .catch((error) => {
        console.error("기록 저장 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(URL.createObjectURL(image));
      });
    };
  }, [images]);

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
        rows="10"
      />
      <button className="save-button" onClick={handleSave}>
        ✔️ 저장
      </button>
    </div>
  );
};

export default RecordDetail;
