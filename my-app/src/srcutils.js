import { fetchAPI } from "./api";
import { initializeTimes, updateTimes } from "./srcutils";
/* global fetchAPI */
export const initializeTimes = () => {
  // ...existing code...
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  return fetchAPI(formattedDate);
};
export const updateTimes = (state, action) => {
  // ...existing code...
  if (action.type === "UPDATE_TIMES") {
    return fetchAPI(action.payload);
  }
  return state;
};
