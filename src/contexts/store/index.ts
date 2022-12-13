import { configureStore } from "@reduxjs/toolkit";

import { themeModeSlice } from "./slices/themeModeSlice";

const store = configureStore({
  reducer: {
    themeMode: themeModeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
