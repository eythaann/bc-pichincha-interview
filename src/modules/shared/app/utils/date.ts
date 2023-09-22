import { Time } from '../../domain/types';

export const addYears = (date: Date, years: number) => {
  const yearsLater = new Date(date);
  yearsLater.setFullYear(date.getFullYear() + years);
  return yearsLater;
};

export const dateToOwnFormat = (date: Date): Time => {
  const day = String(date.getDate()).padStart(2, '0');
  // getMonth() returns a number between 0 and 11 so we need + 1;
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate as Time;
};

export const ownFormatToDate = (time: Time): Date => {
  const [day, month, year] = time.split('/').map((v) => Number(v));
  return new Date(year!, month! - 1, day);
};

export const validateTime = (date: string): date is Time => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(date)) {
    return false;
  }

  const [day, month, year] = date.split('/').map((v) => Number(v));

  if (!year || year < 0) {
    return false;
  }

  if (!month || month < 1 || month > 12) {
    return false;
  }

  const maxDay = new Date(year, month - 1, 0).getDate();
  if (!day || day < 1 || day > maxDay) {
    return false;
  }

  return true;
};