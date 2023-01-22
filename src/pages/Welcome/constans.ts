import { UserState } from "../../store/redux-store/slices/user/user.slice";
import { Role } from "../../shared/enums";

// user
export const DUMMY_LOGIN_STATE: UserState = {
  id: "DUMMY-USER-1",
  role: Role.user,
  isConfigured: true,
  image: "./src/assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg",
  bodyWeights: [
    { date: "2023-01-01", weight: 105 },
    { date: "2023-01-06", weight: 101 },
    { date: "2023-01-14", weight: 98 },
    { date: "2023-01-21", weight: 95 },
    { date: "2023-02-01", weight: 91 },
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
  expirationDate: "",
};

// trainer;
// export const DUMMY_LOGIN_STATE: UserState = {
//   id: "DUMMY-TRAINER-1",
//   role: Role.trainer,
//   isConfigured: true,
//   image: "./src/assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg",
//   expirationDate: "",
// };
