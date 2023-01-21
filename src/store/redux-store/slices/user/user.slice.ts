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
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.id = "";
    },
    login(state, action: { payload: UserState }) {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isConfigured = action.payload.isConfigured;
      state.image = action.payload.image;
      state.bodyWeights = action.payload.bodyWeights;
      state.workouts = action.payload.workouts;
      state.exercisesProgress = action.payload.exercisesProgress;
      state.height = action.payload.height;
    },
  },
});

export const { logout, login } = userSlice.actions;
const { reducer: userReducer } = userSlice;

export default userReducer;
