import { createSlice } from "@reduxjs/toolkit";

type ThemeModeState = {
  isDarkMode: boolean;
};

export const themeModeSlice = createSlice({
  name: "theme-mode",
  initialState: { isDarkMode: true } as ThemeModeState,
  reducers: {
    toggleThemeMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const themeAction = themeModeSlice.actions;
