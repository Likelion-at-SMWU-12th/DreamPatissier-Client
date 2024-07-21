import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Diary.css";

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  // 요일을 한글로 변환하는 함수
  const getWeekday = (day) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return `(${weekdays[day]})`;
  };

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const weekday = getWeekday(date.getDay());

    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  // 날짜를 변경하는 핸들러
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setActiveStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  // 오늘 날짜로 설정
  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setActiveStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // 선택된 날짜를 초기화하는 핸들러
  const handleAddRecord = () => {
    if (selectedDate) {
      alert(`Adding record for ${selectedDate.toLocaleDateString()}`);
    } else {
      alert("Please select a date first.");
    }
  };

  // 월의 타일 클래스 이름을 설정
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
      const isSaturday = date.getDay() === 6;
      const isSunday = date.getDay() === 0;

      if (!isCurrentMonth) {
        return "not-current-month-tile";
      } else if (isSaturday) {
        return "saturday-tile";
      } else if (isSunday) {
        return "sunday-tile";
      }
    }
    return null;
  };

  // 월의 타일 내용 설정
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      return <div className="calendar-date">{date.getDate()}</div>;
    }
    return null;
  };

  // 연도와 월을 변경하는 핸들러
  const updateDate = (year, month) => {
    const newDate = new Date(year, month, 1);
    setActiveStartDate(newDate);
    setSelectedDate(newDate);
  };

  // YearMonthPicker 컴포넌트
  const YearMonthPicker = ({ selectedDate }) => {
    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();

    // 연도 선택 핸들러
    const handleYearChange = (e) => {
      const newYear = parseInt(e.target.value);
      updateDate(newYear, currentMonth);
    };

    // 월 선택 핸들러
    const handleMonthChange = (e) => {
      const newMonth = parseInt(e.target.value);
      updateDate(currentYear, newMonth);
    };

    return (
      <div className="year-month-picker">
        <select
          className="select-date"
          value={currentYear}
          onChange={handleYearChange}
        >
          {[...Array(10)].map((_, i) => {
            const year = 2022 + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select
          className="select-date"
          value={currentMonth}
          onChange={handleMonthChange}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i}>{`${i + 1}월`}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <>
      <div className="selection-container">
        <YearMonthPicker selectedDate={selectedDate} />
        <button onClick={handleTodayClick} className="today-button">
          오늘
        </button>
      </div>

      <div className="diary-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={activeStartDate}
        />
        {selectedDate && (
          <div className="date-container">
            <div className="selected-date">
              {formatDate(selectedDate)} {/* 포맷팅된 날짜를 표시 */}
            </div>
            <button onClick={handleAddRecord} className="add-record-button">
              ➕ &nbsp;먹은 빵 추가하기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Diary;
