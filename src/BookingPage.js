import React, { useState } from "react";
import BookingForm from "./bookingform";

const BookingPage = ({ availableTimes, dispatch }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");

  const handleSubmit = (formData) => {
    console.log("Form submitted with the following data:");
    console.log(formData);
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
        />
        <p aria-live="polite">We look forward to hosting you!</p>
      </>
    </main>
  );
};

export default BookingPage;
