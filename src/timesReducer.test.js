import { initializeTimes, updateTimes } from "./timesReducer";

describe("initializeTimes", () => {
  test("returns the correct initial times", () => {
    const expectedTimes = [
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ];
    const result = initializeTimes();
    expect(result).toEqual(expectedTimes);
  });
});

describe("updateTimes", () => {
  test("returns the same state when no action is provided", () => {
    const initialState = ["17:00", "18:00", "19:00"];
    const action = { type: "UNKNOWN_ACTION" };
    const result = updateTimes(initialState, action);
    expect(result).toEqual(initialState);
  });
});
