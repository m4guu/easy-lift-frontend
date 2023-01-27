import { format } from "date-fns";

export const getTodayDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

export const getLastWeekDate = () => {
  const now = new Date();
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7
  );
  return format(lastWeek, "yyyy-MM-dd");
};

export const getLastMonthDate = () => {
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  return format(lastMonth, "yyyy-MM-dd");
};

export const getLastYearDate = () => {
  const now = new Date();
  const lastYear = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  return format(lastYear, "yyyy-MM-dd");
};
