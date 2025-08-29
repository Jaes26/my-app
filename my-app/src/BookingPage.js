import React, { useReducer, useState } from "react";
import BookingForm from "./bookingform";
import { initializeTimes, updateTimes } from "./srcutils";

const timesReducer = (state, action) => updateTimes(state, action);

// Example booking data array
const bookingData = [
  { date: "2025-08-29", time: "18:00", guests: 2, occasion: "Birthday" },
  { date: "2025-08-30", time: "19:00", guests: 4, occasion: "Anniversary" },
  // Add more bookings as needed
];

const BookingPage = () => {
  const [date, setDate] = useState(""); // or initialize with today's date
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [availableTimes, dispatch] = useReducer(
    timesReducer,
    [],
    initializeTimes
  );

  const handleSubmit = (formData) => {
    // handle successful submission (e.g., show confirmation)
  };

  return (
    <main>
      <>
        <h1>Welcome to Our Reservation Page</h1>
        <p>Please fill out the form below to book your table.</p>
        <BookingForm
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          guests={guests}
          setGuests={setGuests}
          occasion={occasion}
          setOccasion={setOccasion}
          availableTimes={availableTimes}
          dispatch={dispatch}
          onSubmit={handleSubmit}
          bookingData={bookingData}
        />
        <p aria-live="polite">We look forward to hosting you!</p>
      </>
    </main>
  );
};

export default BookingPage;
