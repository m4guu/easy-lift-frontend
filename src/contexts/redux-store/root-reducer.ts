import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./slices/user/user.slice";
import themeModeReducer from "./slices/themeMode/themeMode.silce";

export const reducers = {
  userState: userReducer,
  themeModeState: themeModeReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
