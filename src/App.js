import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmBooking";
import { fetchAPI } from "./api"; // <-- Add this import

// Export initializeTimes so it can be imported in the test file
export const initializeTimes = () => {
  const today = new Date().toISOString().split("T")[0];
  return fetchAPI(today); // <-- Use fetchAPI to get times for today
};

// Reducer function for availableTimes
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return action.payload;
    default:
      return state;
  }
};

function App() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Header />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <BookingPage
                  availableTimes={availableTimes}
                  dispatch={dispatch}
                />
              }
            />
            <Route path="/confirmed" element={<ConfirmedBooking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
