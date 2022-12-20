import { createSlice } from "@reduxjs/toolkit";

export interface ThemeModeState {
  isDarkMode: boolean;
}
const initialState: ThemeModeState = {
  isDarkMode: true,
};

const themeModeSlice = createSlice({
  name: "theme-mode",
  initialState,
  reducers: {
    toggleThemeMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleThemeMode } = themeModeSlice.actions;
const { reducer: themeModeReducer } = themeModeSlice;

export default themeModeReducer;
