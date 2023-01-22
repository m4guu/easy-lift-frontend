import { useSelector } from "react-redux";
import { userSelectors } from "./user.selectors";

export const useGetUserId = () => useSelector(userSelectors.getUserId);

export const useGetUserRouteState = () =>
  useSelector(userSelectors.getUserRouteStateSelector);

export const useGetUserRoleAndImage = () =>
  useSelector(userSelectors.getUserRoleAndImageSelector);

export const useGetUserRole = () =>
  useSelector(userSelectors.getUserRoleSelector);

export const useGetUserBodyWeights = () =>
  useSelector(userSelectors.getUserBodyWeightsSelector);

export const useGetUserExercisesProgress = () =>
  useSelector(userSelectors.getUserExercisesProgress);

export const useGetUserIdAndExpirationDate = () =>
  useSelector(userSelectors.getUserIdAndExpirationDate);
