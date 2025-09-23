import React from "react";
import { useNavigate } from "react-router-dom";
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
  onSubmit,
  bookingData,
}) => {
  const navigate = useNavigate();

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
      onSubmit(formData);
      navigate("/confirmed");
    } else {
      alert("Submission failed. Please try again.");
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  // Client-side validation logic
  const isDateValid = date && date >= today;
  const isTimeValid = time && availableTimes.includes(time);
  const isGuestsValid = guests && Number(guests) >= 1 && Number(guests) <= 10;
  const isOccasionValid =
    occasion && (occasion === "Birthday" || occasion === "Anniversary");
  const formValid =
    isDateValid && isTimeValid && isGuestsValid && isOccasionValid;

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Date: required, cannot be in the past */}
        <label htmlFor="date">Choose date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          required
          min={today}
        />
        {!isDateValid && (
          <span style={{ color: "red" }}>Please select a valid date.</span>
        )}

        {/* Time: required */}
        <label htmlFor="time">Choose time</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a time
          </option>
          {availableTimes.length > 0 ? (
            availableTimes.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))
          ) : (
            <option disabled>No times available</option>
          )}
        </select>
        {!isTimeValid && (
          <span style={{ color: "red" }}>Please select a valid time.</span>
        )}

        {/* Guests: required, min 1, max 10 */}
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
          min="1"
          max="10"
          step="1"
        />
        {!isGuestsValid && (
          <span style={{ color: "red" }}>
            Please enter a number between 1 and 10.
          </span>
        )}

        {/* Occasion: required */}
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          required
        >
          <option value="" disabled>
            Select an occasion
          </option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {!isOccasionValid && (
          <span style={{ color: "red" }}>Please select an occasion.</span>
        )}

        <button type="submit" disabled={!formValid} aria-label="On Click">
          Submit
        </button>
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
