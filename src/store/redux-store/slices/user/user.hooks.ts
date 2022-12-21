import { useSelector } from "react-redux";
import { userSelectors } from "./user.selectors";

export const useGetUserRouteState = () =>
  useSelector(userSelectors.getUserRouteStateSelector);
