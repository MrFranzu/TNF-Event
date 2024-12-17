import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default Calendar Styling
import { db } from "./firebaseConfig"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore";
import "./cal.css"; // Custom styling

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available dates and times from Firestore
  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
        });

        const dates = events.map((event) => ({
          date: new Date(event.eventDate.seconds * 1000), // Firestore timestamp
          times: { startTime: event.startTime, endTime: event.endTime },
        }));
        setAvailableDates(dates);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDates();
  }, []);

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    const times = availableDates
      .filter((d) => d.date.toDateString() === date.toDateString())
      .map((d) => d.times);
    setAvailableTimes(times);
  };

  // Highlight available dates
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isAvailable = availableDates.some(
        (d) => d.date.toDateString() === date.toDateString()
      );
      return isAvailable ? "highlighted-date" : null;
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Event Calendar</h1>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
        className="custom-calendar"
      />
      {loading && <p className="loading-text">Loading dates...</p>}
      {selectedDate && (
        <div className="times-container">
          <h2 className="times-title">
            Available Times for {selectedDate.toDateString()}
          </h2>
          {availableTimes.length > 0 ? (
            <ul className="times-list">
              {availableTimes.map((time, index) => (
                <li key={index} className="time-slot">
                  {time.startTime} - {time.endTime}
                </li>
              ))}
            </ul>
          ) : (
            <p className="fully-available">This date is fully available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
