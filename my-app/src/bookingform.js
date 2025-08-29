import React from "react";

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
}) => {
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    dispatch({ type: "UPDATE_TIMES", payload: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, time, guests, occasion });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Choose date</label>
      <input type="date" id="date" value={date} onChange={handleDateChange} />

      <label htmlFor="time">Choose time</label>
      <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
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
  );
};

export default BookingForm;
