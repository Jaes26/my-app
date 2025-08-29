/* global fetchAPI, submitAPI */
import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { fetchAPI, submitAPI } from "./api";

const BookingForm = ({
  availableTimes,
  date,
  setDate,
  time,
  setTime,
  guests,
  setGuests,
  occasion,
  setOccasion,
  dispatch,
  onSubmit, // Receive submitForm as onSubmit
  bookingData,
}) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    const times = fetchAPI(selectedDate);
    dispatch({ type: "UPDATE_TIMES", payload: times });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { date, time, guests, occasion };
    const success = submitAPI(formData);
    if (success) {
      onSubmit(formData); // Call submitForm passed via props
      navigate("/confirmed"); // Redirect to confirmation page
    } else {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* ...form fields... */}
        <label htmlFor="date">Choose date</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} />

        <label htmlFor="time">Choose time</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {availableTimes.length > 0 ? (
            availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))
          ) : (
            <option disabled>No times available</option>
          )}
        </select>

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          max="10"
        />

        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="">Select an occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>

        <button type="submit">Submit</button>
      </form>
      {/* Add table below the form */}
      <h2>Current Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Occasion</th>
          </tr>
        </thead>
        <tbody>
          {bookingData && bookingData.length > 0 ? (
            bookingData.map((booking, idx) => (
              <tr key={idx}>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>{booking.occasion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No bookings yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default BookingForm;
