
export const addHours = (date: Date, hours: number) => {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);

  return date;
};

export const addDays = (date: Date, days: number) => {
  return addHours(date, days * 24);
};

export const addYears = (date: Date, years: number) => {
  return addDays(date, years * 365);
};