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

export const getLongFormByDate = (stringDate: string) => {
  const date = new Date(stringDate);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const getHowMuchDaysUntill = (stringDate: string) => {
  const today = new Date();
  const date = new Date(stringDate);

  const timeDiff = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
};
