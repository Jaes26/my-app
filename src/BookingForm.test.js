jest.mock("react-router-dom", () => ({
  MemoryRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

test("renders static labels in the BookingForm", () => {
  renderWithRouter(
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
      bookingData={[]}
    />
  );
  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
});

test("renders the submit button", () => {
  renderWithRouter(
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
      bookingData={[]}
    />
  );
  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});

test("date input has correct HTML5 validation attributes", () => {
  renderWithRouter(
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
      bookingData={[]}
    />
  );
  const dateInput = screen.getByLabelText(/choose date/i);
  expect(dateInput).toHaveAttribute("type", "date");
  expect(dateInput).toBeRequired();
  const today = new Date().toISOString().split("T")[0];
  expect(dateInput).toHaveAttribute("min", today);
});

test("time select has correct HTML5 validation attributes", () => {
  renderWithRouter(
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
      bookingData={[]}
    />
  );
  const timeSelect = screen.getByLabelText(/choose time/i);
  expect(timeSelect.tagName).toBe("SELECT");
  expect(timeSelect).toBeRequired();
});

test("guests input has correct HTML5 validation attributes", () => {
  renderWithRouter(
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
      bookingData={[]}
    />
  );
  const guestsInput = screen.getByLabelText(/number of guests/i);
  expect(guestsInput).toHaveAttribute("type", "number");
  expect(guestsInput).toBeRequired();
  expect(guestsInput).toHaveAttribute("min", "1");
  expect(guestsInput).toHaveAttribute("max", "10");
  expect(guestsInput).toHaveAttribute("step", "1");
});

test("occasion select has correct HTML5 validation attributes", () => {
  renderWithRouter(
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
      bookingData={[]}
    />
  );
  const occasionSelect = screen.getByLabelText(/occasion/i);
  expect(occasionSelect.tagName).toBe("SELECT");
  expect(occasionSelect).toBeRequired();
});

// --- FORM SUBMISSION VALIDATION TESTS ---

test("form does not submit with invalid data", () => {
  const onSubmit = jest.fn();
  renderWithRouter(
    <BookingForm
      availableTimes={["17:00", "18:00", "19:00"]}
      date="" // invalid
      setDate={() => {}}
      time="" // invalid
      setTime={() => {}}
      guests="" // invalid
      setGuests={() => {}}
      occasion="" // invalid
      setOccasion={() => {}}
      dispatch={() => {}}
      onSubmit={onSubmit}
      bookingData={[]}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(onSubmit).not.toHaveBeenCalled();
});

test("form submits with valid data", () => {
  const onSubmit = jest.fn();
  renderWithRouter(
    <BookingForm
      availableTimes={["17:00", "18:00", "19:00"]}
      date="2025-09-02"
      setDate={() => {}}
      time="17:00"
      setTime={() => {}}
      guests="2"
      setGuests={() => {}}
      occasion="Birthday"
      setOccasion={() => {}}
      dispatch={() => {}}
      onSubmit={onSubmit}
      bookingData={[]}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(onSubmit).toHaveBeenCalled();
});
