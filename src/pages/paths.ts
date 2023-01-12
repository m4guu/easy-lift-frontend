export enum PATHS {
  default = "/",
  notFound = "*",
  AUTH = "/auth/",
  CONFIGURATION = "/configuration/",
  NEW_PROGRAM = "/newprogram/",
  TRAINERS = "/trainers/",
  PROGRAMS = "/programs/",
  NEW_WORKOUT = "/newworkout/",
  WORKOUTS = "/workouts/",
  BODY_WEIGHT = "/bodyweight/",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum NESTED_PATHS {
  NEW_PROGRAM_CREATOR = "/newprogram/creator",
  TRAINER = "/trainers/:trainerId",
  PROGRAM = "/programs/:programId",
  EXERCISE_LIST = "/newworkout/exercises",
  EXERCISE = "/newworkout/exercises/:exerciseId",
  WORKOUT = "/workouts/:workoutId",
}
