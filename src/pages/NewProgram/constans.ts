import { v4 as uuid } from "uuid";

export const DUMMY_PROGRAM = {
  id: uuid(),
  creator: "DUMMY-TRAINER-1",
  title: "NEW PROGRAM!",
  description: "Probably the most random thing you have ever seen!",
  price: 1999,
};

export const steps = [
  "Basic Information",
  "Add Workouts",
  "Describe New Program",
];
