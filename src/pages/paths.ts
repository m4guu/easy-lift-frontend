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
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum NESTED_PATHS {
  NEW_PROGRAM_CREATOR = "creator",
  TRAINER = ":trainerId",
  PROGRAM = ":programId",
  EXERCISE_LIST = "exercises",
  EXERCISE = "/exercises/:exerciseId",
  WORKOUT = "/:workoutId",
}
