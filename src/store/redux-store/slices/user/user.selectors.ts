import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store-config";

const selectUserId = (state: RootState) => state.userState.id;
const selectUserConfigured = (state: RootState) => state.userState.isConfigured;
const selectUserRole = (state: RootState) => state.userState.role;
const selectUserImage = (state: RootState) => state.userState.image;
const selectUserBodyWeights = (state: RootState) => state.userState.bodyWeights;
const selectUserWorkouts = (state: RootState) => state.userState.workouts;
const selectUserExercisesProgress = (state: RootState) =>
  state.userState.exercisesProgress;
const selectUserExpirationDate = (state: RootState) =>
  state.userState.expirationDate;

const getUserRouteStateSelector = createSelector(
  [selectUserId, selectUserConfigured, selectUserRole],
  (id, isConfigured, role) => {
    return { id, isConfigured, role };
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

const getUserBodyWeightsSelector = createSelector(
  [selectUserBodyWeights],
  (bodyWeights) => {
    return { bodyWeights };
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

const getUserIdAndExpirationDate = createSelector(
  [selectUserId, selectUserExpirationDate],
  (id, expirationDate) => {
    return { id, expirationDate };
  }
);

export const userSelectors = {
  getUserRouteStateSelector,
  getUserRoleAndImageSelector,
  getUserRoleSelector,
  getUserBodyWeightsSelector,
  getUserWorkouts,
  getUserExercisesProgress,
  getUserIdAndExpirationDate,
};
