import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store-config";

const selectIsDarkMode = (state: RootState) => state.themeModeState.isDarkMode;

const isDarkModeSelector = createSelector(
  [selectIsDarkMode],
  (isDarkMode) => isDarkMode
);

export const themeModeSelectors = { isDarkModeSelector };
