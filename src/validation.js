export const isDateValid = (date, today) => Boolean(date) && date >= today;
export const isTimeValid = (time, availableTimes) =>
  Boolean(time) && availableTimes.includes(time);
export const isGuestsValid = (guests) =>
  Boolean(guests) && Number(guests) >= 1 && Number(guests) <= 10;
export const isOccasionValid = (occasion) =>
  Boolean(occasion) && (occasion === "Birthday" || occasion === "Anniversary");
