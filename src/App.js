import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmBooking";
import Menu from "./menu"; // <-- Add this import
import { fetchAPI } from "./api";

export const initializeTimes = () => {
  const today = new Date().toISOString().split("T")[0];
  return fetchAPI(today);
};

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
            <Route
              path="/booking"
              element={
                <BookingPage
                  availableTimes={availableTimes}
                  dispatch={dispatch}
                />
              }
            />
            <Route path="/menu" element={<Menu />} /> {/* <-- Add this line */}
            <Route path="/confirmed" element={<ConfirmedBooking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
