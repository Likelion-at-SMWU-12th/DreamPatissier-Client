import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "../styles/Diary.css";
import Bread from "../assets/bread_stamp.png";
import editIcon from "../assets/edit-icon.png";
import deleteIcon from "../assets/delete-icon.png";

const getWeekday = (day) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return `(${weekdays[day]})`;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = getWeekday(date.getDay());
  return `${year}년 ${month}월 ${day}일 ${weekday}`;
};

const formatDateForSave = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const tileClassName = ({ date, view, activeStartDate }) => {
  if (view === "month") {
    const currentMonth = activeStartDate.getMonth();
    const currentYear = activeStartDate.getFullYear();

    const isCurrentMonth =
      date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    const isSaturday = date.getDay() === 6;
    const isSunday = date.getDay() === 0;

    if (!isCurrentMonth) {
      return "not-current-month-tile";
    }

    if (isSaturday) {
      return "saturday-tile";
    }

    if (isSunday) {
      return "sunday-tile";
    }
  }
  return null;
};

const tileContent = ({ date, view, reviews }) => {
  if (view === "month") {
    const dateKey = formatDateForSave(date);
    return (
      <div className="calendar-date">
        {reviews[dateKey] && (
          <img src={Bread} alt="Bread" className="bread-icon" />
        )}
        {!reviews[dateKey] && date.getDate()}
      </div>
    );
  }
  return null;
};

const YearMonthPicker = ({ selectedDate, updateDate }) => {
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  return (
    <div className="year-month-picker">
      <select
        className="select-date"
        value={currentYear}
        onChange={(e) => updateDate(parseInt(e.target.value), currentMonth)}
      >
        {[...Array(10)].map((_, i) => (
          <option key={2022 + i} value={2022 + i}>
            {2022 + i}
          </option>
        ))}
      </select>
      <select
        className="select-date"
        value={currentMonth}
        onChange={(e) => updateDate(currentYear, parseInt(e.target.value))}
      >
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i}>
            {i + 1}월
          </option>
        ))}
      </select>
    </div>
  );
};

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/record")
      .then((response) => {
        const data = response.data;
        if (typeof data === "object" && data !== null) {
          setReviews(data);
        } else {
          console.error(
            "Fetched data is not in the expected object format:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setActiveStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setActiveStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleAddRecord = () => {
    const date = formatDateForSave(selectedDate);
    navigate(`/record/${date}`);
  };

  const updateDate = (year, month) => {
    const newDate = new Date(year, month, 1);
    setActiveStartDate(newDate);
    setSelectedDate(newDate);
  };

  const selectedDateKey = formatDateForSave(selectedDate);
  const reviewList = reviews[selectedDateKey] || [];

  const handleDeleteReview = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/reviews/${id}`
      );

      if (response.status === 200) {
        setReviews((prevReviews) => {
          const newReviews = { ...prevReviews };
          newReviews[selectedDateKey] = newReviews[selectedDateKey].filter(
            (review) => review.id !== id
          );
          return newReviews;
        });
      } else {
        console.error("Failed to delete review. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditReview = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <div className="selection-container">
        <YearMonthPicker selectedDate={selectedDate} updateDate={updateDate} />
        <button onClick={handleTodayClick} className="today-button">
          오늘
        </button>
      </div>

      <div className="diary-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={(props) =>
            tileClassName({ ...props, activeStartDate })
          }
          tileContent={(props) => tileContent({ ...props, reviews })}
          activeStartDate={activeStartDate}
        />
        {selectedDate && (
          <div className="date-container">
            <div className="selected-date">{formatDate(selectedDate)}</div>
            <button onClick={handleAddRecord} className="add-record-button">
              ➕ &nbsp;먹은 빵 추가하기
            </button>
            {reviewList.length > 0 && (
              <div className="review-container">
                {reviewList.map((review) => (
                  <div key={review.id} className="review-item">
                    <img src={Bread} className="review-stamp-image" />
                    <hr className="vertical-line" />
                    <div className="review-content">
                      <div className="bread-title">
                        [{review.bakeryName}] {review.breadName}
                      </div>
                      <div className="review-tag">{review.tags.join(", ")}</div>
                      <div className="review-text">{review.review}</div>
                      <img src={Bread} className="review-show-image" />
                    </div>
                    <div className="button-div">
                      <button
                        onClick={() => handleEditReview(review.id)}
                        className="diary-edit-button"
                      >
                        <img src={editIcon} alt="Edit" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="diary-delete-button"
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Diary;
