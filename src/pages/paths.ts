export enum PATHS {
  default = "/",
  notFound = "*",

  AUTH = "/auth",
  CONFIGURATION = "/configuration",

  TRAINERS = "/trainers",
  PROGRAMS = "/programs",
  WORKOUTS = "/workouts",
  EXERCISES = "/exercises",
  EXERCISES_PROGRESS = "/exercises/progress",

  NEW_PROGRAM = "/newprogram",
  NEW_WORKOUT = "/newworkout",

  BODY_WEIGHT = "/bodyweight",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum NESTED_PATHS {
  NEW_PROGRAM_CREATOR = "/newprogram/creator",

  TRAINER = "/trainers/:trainerId",
  PROGRAM = "/programs/:programId",
  WORKOUT = "/workouts/:workoutId",
  EXERCISE = "/exercises/:exerciseId",
  EXERCISE_PROGRESS = "/exercises/progress/:exerciseId",
}
