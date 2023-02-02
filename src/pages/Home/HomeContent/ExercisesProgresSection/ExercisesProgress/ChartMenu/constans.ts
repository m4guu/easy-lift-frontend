import { v4 as uuidv4 } from "uuid";

import {
  getLastWeekDate,
  getLastMonthDate,
  getLastYearDate,
} from "../../../../../../utils/Date";

export const initialFormInputs = {
  exerciseID: {
    name: "exerciseID",
    label: "Exercise",
    value: "0289",
  },
  dateRange: {
    name: "dateRange",
    label: "Date Range",
    value: "default",
    options: [
      { id: uuidv4(), name: "All Time", value: "default" },
      { id: uuidv4(), name: "Year", value: getLastYearDate() },
      { id: uuidv4(), name: "Month", value: getLastMonthDate() },
      { id: uuidv4(), name: "Week", value: getLastWeekDate() },
    ],
  },
};
