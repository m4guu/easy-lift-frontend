import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store-config";

const selectUserToken = (state: RootState) => state.userState.token;
const selectUserConfigured = (state: RootState) => state.userState.isConfigured;
const selectUserRole = (state: RootState) => state.userState.role;
const selectUserImage = (state: RootState) => state.userState.image;
const selectUserWeights = (state: RootState) => state.userState.weights;
const selectUserWorkouts = (state: RootState) => state.userState.workouts;
const selectUserExercisesProgress = (state: RootState) =>
  state.userState.exercisesProgress;

const getUserRouteStateSelector = createSelector(
  [selectUserToken, selectUserConfigured, selectUserRole],
  (token, isConfigured, role) => {
    return { token, isConfigured, role };
  }
);

const getUserRoleAndImageSelector = createSelector(
  [selectUserRole, selectUserImage],
  (role, image) => {
    return { role, image };
  }
);

const getUserRoleSelector = createSelector([selectUserRole], (role) => {
  return { role };
});

const getUserWeightsSelector = createSelector(
  [selectUserWeights],
  (weights) => {
    return { weights };
  }
);

const getUserWorkouts = createSelector([selectUserWorkouts], (workouts) => {
  return { workouts };
});

const getUserExercisesProgress = createSelector(
  [selectUserExercisesProgress],
  (exercisesProgress) => {
    return { exercisesProgress };
  }
);

export const userSelectors = {
  getUserRouteStateSelector,
  getUserRoleAndImageSelector,
  getUserRoleSelector,
  getUserWeightsSelector,
  getUserWorkouts,
  getUserExercisesProgress,
};
