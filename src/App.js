import { fetchAPI } from "./api";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import Nav from "./nav";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmBooking"; // Import your confirmation component

// Export initializeTimes so it can be imported in the test file
export const initializeTimes = () => [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

// Reducer function for availableTimes
export const updateTimes = (state, action) => {
  switch (action.type) {
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
