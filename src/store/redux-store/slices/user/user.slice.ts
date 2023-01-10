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
  image: string; // DUMMY DATA
  weights?: { date: string; weight: number }[];
  height?: number;
  workouts?: {
    id: string;
    title: string;
    date: string;
    exercises: {
      name: string;
      sets: { weight: number; reps: number; RM: number }[];
    }[];
  }[];
  exercisesProgress?: {
    exerciseID: string;
    name: string;
    progress: { date: string; RM: number }[];
  }[];

  progrmas?: { id: string; name: string; price: number }[];
}

const initialState: UserState = {
  token: "DUMMY_USER_0",
  id: "",
  role: Role.user,
  isConfigured: true,
  image: "./src/assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg",
  weights: [
    { date: "2023-01-01", weight: 105 },
    { date: "2023-01-06", weight: 101 },
    { date: "2023-01-14", weight: 98 },
    { date: "2023-01-21", weight: 95 },
    { date: "2023-02-01", weight: 91 },
  ],
  workouts: [
    {
      id: "DUMMY-workout-id-1",
      title: "Monday chest",
      date: "2023-01-01",
      exercises: [
        {
          name: "Bench Press",
          sets: [{ weight: 120, reps: 5, RM: 150 }],
        },
        {
          name: "Squat",
          sets: [{ weight: 120, reps: 4, RM: 245 }],
        },
        {
          name: "Deadlift",
          sets: [{ weight: 120, reps: 3, RM: 345 }],
        },
      ],
    },
    {
      id: "DUMMY-workout-id-2",
      title: "Squat day",
      date: "2023-01-11",
      exercises: [
        {
          name: "Bench Press",
          sets: [{ weight: 150, reps: 5, RM: 170 }],
        },
        {
          name: "Squat",
          sets: [{ weight: 150, reps: 6, RM: 270 }],
        },
        {
          name: "Deadlift",
          sets: [{ weight: 150, reps: 7, RM: 370 }],
        },
      ],
    },
  ],
  exercisesProgress: [
    {
      exerciseID: "DUMMY-EXERCISE-PROGRESS-ID-1",
      name: "bench press",
      progress: [
        { date: "2023-01-01", RM: 150 },
        { date: "2023-01-11", RM: 170 },
        { date: "2023-01-13", RM: 120 },
        { date: "2023-01-23", RM: 220 },
      ],
    },
    {
      exerciseID: "DUMMY-EXERCISE-PROGRESS-ID-2",
      name: "squat",
      progress: [
        { date: "2023-01-01", RM: 245 },
        { date: "2023-01-11", RM: 270 },
        { date: "2023-01-13", RM: 210 },
        { date: "2023-01-23", RM: 300 },
      ],
    },
    {
      exerciseID: "DUMMY-EXERCISE-PROGRESS-ID-3",
      name: "deadlift",
      progress: [
        { date: "2023-01-01", RM: 345 },
        { date: "2023-01-11", RM: 370 },
      ],
    },
  ],
  height: 180,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
    },
  },
});

export const { logout } = userSlice.actions;
const { reducer: userReducer } = userSlice;

export default userReducer;