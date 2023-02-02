import { v4 as uuid } from "uuid";
import { Workout } from "../../shared/interfaces";

export const DUMMY_WORKOUT: Workout = {
  id: uuid(),
  title: "new workout",
  creator: "DUMMY-USER-1",
  date: "2023-01-01",
  exercises: [
    {
      id: "0289",
      name: "bench press",
      sets: [
        { weight: 120, tempo: "1-4-5-0", reps: 5, repMax: 150 },
        { weight: 130, tempo: "1-4-5-0", reps: 5, repMax: 155 },
        { weight: 150, tempo: "1-4-5-0", reps: 5, repMax: 170 },
      ],
    },
    {
      id: "3194",
      name: "squat",
      sets: [
        { weight: 220, tempo: "1-4-5-0", reps: 4, repMax: 245 },
        { weight: 220, tempo: "1-4-5-0", reps: 4, repMax: 255 },
      ],
    },
    {
      id: "0300",
      name: "deadlift",
      sets: [
        { weight: 120, tempo: "1-4-5-0", reps: 3, repMax: 345 },
        { weight: 120, tempo: "1-4-5-0", reps: 3, repMax: 365 },
      ],
    },
  ],
};
