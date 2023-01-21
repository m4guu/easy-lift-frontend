import { createSlice } from "@reduxjs/toolkit";

import {
  Workout,
  BodyWeight,
  ExerciseProgress,
  Program,
} from "../../../../shared/interfaces";
import { Role } from "../../../../shared/enums";

export interface UserState {
  id: string;
  role: Role;
  isConfigured: boolean;
  image: string; // DUMMY DATA
  bodyWeights: BodyWeight[];
  height: number;
  workouts: Workout[];
  exercisesProgress: ExerciseProgress[];
  progrmas?: Program[];
  expirationDate: string;
}

const initialState: UserState = {
  id: "",
  role: Role.user,
  isConfigured: false,
  image: "",
  bodyWeights: [],
  workouts: [],
  exercisesProgress: [],
  height: 0,
  expirationDate: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem("userData");
      return initialState;
    },
    login(state, action: { payload: UserState }) {
      const loginExpirationDate =
        action.payload.expirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toISOString();

      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isConfigured = action.payload.isConfigured;
      state.image = action.payload.image;
      state.bodyWeights = action.payload.bodyWeights;
      state.workouts = action.payload.workouts;
      state.exercisesProgress = action.payload.exercisesProgress;
      state.height = action.payload.height;
      state.expirationDate = loginExpirationDate;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...action.payload,
          expirationDate: loginExpirationDate,
        })
      );
    },
  },
});

export const { logout, login } = userSlice.actions;
const { reducer: userReducer } = userSlice;

export default userReducer;
