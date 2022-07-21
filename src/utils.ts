import { getDate, getMonth, getYear, subDays } from "date-fns";

export const getYesterday = () => subDays(new Date(), 1);
export const dateToYearMonthDay = (date: Date): [number, number, number] => [
  getYear(date),
  getMonth(date),
  getDate(date),
];
export const padWithZero = (num: number) => (num < 10 ? `0${num}` : num);
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const namespace = "sun-wall";
export const setInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(`${namespace}/${key}`, value);
}
export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(`${namespace}/${key}`);
}
