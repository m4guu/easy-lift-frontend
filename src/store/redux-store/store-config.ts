import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { ThemeModeState } from "./slices/themeMode/themeMode.silce";

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = {
  themeModeState: ThemeModeState;
};
export type AppDispatch = typeof store.dispatch;
export default store;
