import { v4 as uuid } from "uuid";
import { Workout } from "../../shared/interfaces";

export const DUMMY_WORKOUT: Workout = {
  id: uuid(),
  title: "new workout",
  creator: "DUMMY-USER-1",
  date: "2023-01-01",
  exercises: [
    {
      id: "DUMMY-EXERCISE-ID-1",
      name: "bench press",
      sets: [
        { weight: 120, reps: 5, repMax: 150 },
        { weight: 130, reps: 5, repMax: 155 },
        { weight: 150, reps: 5, repMax: 170 },
      ],
    },
    {
      id: "DUMMY-EXERCISE-ID-2",
      name: "squat",
      sets: [
        { weight: 220, reps: 4, repMax: 245 },
        { weight: 220, reps: 4, repMax: 255 },
      ],
    },
    {
      id: "DUMMY-EXERCISE-ID-3",
      name: "deadlift",
      sets: [
        { weight: 120, reps: 3, repMax: 345 },
        { weight: 120, reps: 3, repMax: 365 },
      ],
    },
  ],
};
