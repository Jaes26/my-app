import {
  isDateValid,
  isTimeValid,
  isGuestsValid,
  isOccasionValid,
} from "./validation";

describe("Validation functions", () => {
  const today = "2025-09-02";
  const availableTimes = ["17:00", "18:00", "19:00"];

  test("isDateValid returns true for valid date", () => {
    expect(isDateValid("2025-09-02", today)).toBe(true);
    expect(isDateValid("2025-09-03", today)).toBe(true);
  });

  test("isDateValid returns false for invalid date", () => {
    expect(isDateValid("2025-09-01", today)).toBe(false);
    expect(isDateValid("", today)).toBe(false);
    expect(isDateValid(null, today)).toBe(false);
  });

  test("isTimeValid returns true for valid time", () => {
    expect(isTimeValid("17:00", availableTimes)).toBe(true);
    expect(isTimeValid("18:00", availableTimes)).toBe(true);
  });

  test("isTimeValid returns false for invalid time", () => {
    expect(isTimeValid("20:00", availableTimes)).toBe(false);
    expect(isTimeValid("", availableTimes)).toBe(false);
    expect(isTimeValid(null, availableTimes)).toBe(false);
  });

  test("isGuestsValid returns true for valid guests", () => {
    expect(isGuestsValid("1")).toBe(true);
    expect(isGuestsValid("10")).toBe(true);
    expect(isGuestsValid(5)).toBe(true);
  });

  test("isGuestsValid returns false for invalid guests", () => {
    expect(isGuestsValid("0")).toBe(false);
    expect(isGuestsValid("11")).toBe(false);
    expect(isGuestsValid("")).toBe(false);
    expect(isGuestsValid(null)).toBe(false);
  });

  test("isOccasionValid returns true for valid occasion", () => {
    expect(isOccasionValid("Birthday")).toBe(true);
    expect(isOccasionValid("Anniversary")).toBe(true);
  });

  test("isOccasionValid returns false for invalid occasion", () => {
    expect(isOccasionValid("Wedding")).toBe(false);
    expect(isOccasionValid("")).toBe(false);
    expect(isOccasionValid(null)).toBe(false);
  });
});
