import { useSelector } from "react-redux";
import { userSelectors } from "./user.selectors";

export const useGetUserRouteState = () =>
  useSelector(userSelectors.getUserRouteStateSelector);

export const useGetUserRoleAndImage = () =>
  useSelector(userSelectors.getUserRoleAndImageSelector);

export const useGetUserRole = () =>
  useSelector(userSelectors.getUserRoleSelector);

export const useGetUserWeights = () =>
  useSelector(userSelectors.getUserWeightsSelector);

export const useGetUserWorkouts = () =>
  useSelector(userSelectors.getUserWorkouts);

export const useGetUserExercisesProgress = () =>
  useSelector(userSelectors.getUserExercisesProgress);
