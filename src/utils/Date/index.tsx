import moment from "moment";

export const getLastWeekDate = () => {
  const now = new Date();
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7
  );
  return moment(lastWeek).format("YYYY-MM-DD");
};

export const getLastMonthDate = () => {
  const now = new Date();
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  return moment(lastMonth).format("YYYY-MM-DD");
};

export const getLastYearDate = () => {
  const now = new Date();
  const lastYear = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  return moment(lastYear).format("YYYY-MM-DD");
};
