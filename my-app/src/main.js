import React, { useReducer } from "react";
import BookingPage from "./BookingPage";

// Function to initialize available times
const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

// Reducer function to update available times
const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      // For now, return the same times regardless of the date
      return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    default:
      return state;
  }
};

function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <div>
      <h1>Main Component</h1>
      <BookingPage availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
}

export default Main;
