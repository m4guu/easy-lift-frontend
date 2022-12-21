import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store-config";

const selectUserToken = (state: RootState) => state.userState.token;
const selectUserConfigured = (state: RootState) => state.userState.isConfigured;
const selectUserRole = (state: RootState) => state.userState.role;

const getUserRouteStateSelector = createSelector(
  [selectUserToken, selectUserConfigured, selectUserRole],
  (token, isConfigured, role) => {
    return { token, isConfigured, role };
  }
);

export const userSelectors = { getUserRouteStateSelector };
