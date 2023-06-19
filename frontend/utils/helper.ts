import dayjs from "dayjs";

export function getMonth(month) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      // return dayjs(new Date(year, month, currentMonthCount));
      const date = dayjs(new Date(year, month, currentMonthCount));
      return date.toISOString(); 
    });
  });
  return daysMatrix;
}


export const isValidDateFormat = (date:any) => {
  const dateFormatRegex = /^\d{2}-\d{2}-\d{2}$/;
  return dateFormatRegex.test(date);
};

// Usage
const date = "12-05-21";
const isValid = isValidDateFormat(date); // true

const date2 = "15/08/2021";
const isValid2 = isValidDateFormat(date2); // false
