//
// 빵레시피
//

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Diary.css";

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const addRecord = () => {
    alert(`Adding record for ${selectedDate.toLocaleDateString()}`);
  };

  return (
    <div className="diary-container">
      <h1>My Diary</h1>
      <Calendar onChange={onDateChange} value={selectedDate} />
      {selectedDate && (
        <button onClick={addRecord} className="add-record-button">
          Add Record for {selectedDate.toLocaleDateString()}
        </button>
      )}
    </div>
  );
};

export default Diary;
