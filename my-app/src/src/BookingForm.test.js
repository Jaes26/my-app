import React from "react";
import { render, screen } from "@testing-library/react";
import BookingForm from "./bookingform";

test("renders static labels in the BookingForm", () => {
  render(
    <BookingForm
      availableTimes={["17:00", "18:00", "19:00"]}
      date=""
      setDate={() => {}}
      time=""
      setTime={() => {}}
      guests={1}
      setGuests={() => {}}
      occasion=""
      setOccasion={() => {}}
      dispatch={() => {}}
      onSubmit={() => {}}
    />
  );

  // Check if the static labels are rendered
  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
});

test("renders the submit button", () => {
  render(
    <BookingForm
      availableTimes={["17:00", "18:00", "19:00"]}
      date=""
      setDate={() => {}}
      time=""
      setTime={() => {}}
      guests={1}
      setGuests={() => {}}
      occasion=""
      setOccasion={() => {}}
      dispatch={() => {}}
      onSubmit={() => {}}
    />
  );

  // Check if the submit button is rendered
  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});
