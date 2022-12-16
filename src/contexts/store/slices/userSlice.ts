import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  id: string;
  role: "trainer" | "user";
  configured: boolean;
} | null;
const initialUserState = { id: "ssa", role: "user", configured: true };

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState as UserState,
  reducers: {},
});

export const userAction = userSlice.actions;
