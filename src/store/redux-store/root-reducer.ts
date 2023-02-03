import { combineReducers } from "@reduxjs/toolkit";

import themeModeReducer from "./slices/themeMode/themeMode.silce";

export const reducers = {
  themeModeState: themeModeReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
