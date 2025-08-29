import { submitAPI } from "./api";
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingPage from "./BookingPage";

const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
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
  const navigate = useNavigate();

  // Function to submit the form
  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      navigate("/confirmed");
    } else {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Main Component</h1>
      <BookingPage
        availableTimes={availableTimes}
        dispatch={dispatch}
        onSubmit={submitForm} // Pass submitForm to BookingPage
      />
    </div>
  );
}

export default Main;
