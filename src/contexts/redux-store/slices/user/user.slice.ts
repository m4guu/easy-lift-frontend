import { createSlice } from "@reduxjs/toolkit";

enum Role {
  user = "user",
  trainer = "trainer",
}

export interface UserState {
  token: string;
  id: string;
  role: Role.trainer | Role.user;
  isConfigured: boolean;
}

const initialState: UserState = {
  token: "",
  id: "",
  role: Role.user,
  isConfigured: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userAction = userSlice.actions;
const { reducer: userReducer } = userSlice;

export default userReducer;
