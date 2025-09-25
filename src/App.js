import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmBooking";
import Menu from "./menu";
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
                // You can add a homepage component here instead of BookingPage
                <div>
                  <h1>Welcome to Our Restaurant</h1>
                  {/* Banner and other homepage content */}
                </div>
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
            <Route path="/menu" element={<Menu />} />
            <Route path="/confirmed" element={<ConfirmedBooking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
