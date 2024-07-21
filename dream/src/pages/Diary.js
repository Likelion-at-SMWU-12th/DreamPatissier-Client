import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "../styles/Diary.css";
import Bread from "../assets/bread_stamp.png";

const exampleReviews = {
  "2024-07-20": [
    {
      breadName: "통밀빵",
      bakeryName: "빵집 A",
      tags: ["맛있다", "건강한"],
      review: "부드럽고 건강한 통밀빵이었습니다!",
    },
    {
      breadName: "바게트",
      bakeryName: "빵집 B",
      tags: ["바삭하다", "고소한"],
      review: "겉은 바삭하고 속은 촉촉한 바게트!",
    },
  ],
};

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

const tileClassName = ({ date, view }) => {
  if (view === "month") {
    const isCurrentMonth = date.getMonth() === new Date().getMonth();
    const isWeekend = date.getDay() === 6 || date.getDay() === 0;
    if (!isCurrentMonth) return "not-current-month-tile";
    if (isWeekend) return date.getDay() === 6 ? "saturday-tile" : "sunday-tile";
  }
  return null;
};

const tileContent = ({ date, view, recipes }) => {
  if (view === "month") {
    const dateKey = formatDateForSave(date);
    return (
      <div className="calendar-date">
        {recipes[dateKey] && (
          <img src={Bread} alt="Bread" className="bread-icon" />
        )}
        {!recipes[dateKey] && date.getDate()}
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
  const [recipes, setRecipes] = useState({});
  const [reviews, setReviews] = useState(exampleReviews);

  const navigate = useNavigate();

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
          tileClassName={tileClassName}
          tileContent={(props) => tileContent({ ...props, recipes })}
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
                <h3>후기</h3>
                {reviewList.map((review, index) => (
                  <div key={index} className="review-item">
                    <p>
                      <strong>빵 이름:</strong> {review.breadName}
                    </p>
                    <p>
                      <strong>빵 가게 이름:</strong> {review.bakeryName}
                    </p>
                    <p>
                      <strong>태그:</strong> {review.tags.join(", ")}
                    </p>
                    <p>
                      <strong>후기:</strong> {review.review}
                    </p>
                    <hr />
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
