import { configureStore } from "@reduxjs/toolkit";

import { themeModeSlice } from "./slices/themeModeSlice";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    themeMode: themeModeSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
