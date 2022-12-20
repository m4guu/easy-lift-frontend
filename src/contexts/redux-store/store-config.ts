import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { UserState } from "./slices/user/user.slice";
import { ThemeModeState } from "./slices/themeMode/themeMode.silce";

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = {
  userState: UserState;
  themeModeState: ThemeModeState;
};
export type AppDispatch = typeof store.dispatch;
export default store;
