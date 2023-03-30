export enum PATHS {
  default = "/",
  notFound = "*",

  AUTH = "/auth",
  CONFIGURATION = "/configuration",

  TRAINERS = "/trainers",
  PROGRAMS = "/programs",
  WORKOUTS = "/workouts",

  NEW_PROGRAM = "/newprogram",
  NEW_WORKOUT = "/newworkout",

  BODY_WEIGHT = "/bodyweight",
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum NESTED_PATHS {
  TRAINER = `/trainers/:trainerId`,
  PROGRAM = "/programs/:programId",

  WORKOUT = "/workouts/:workoutId",
  EDIT_WORKOUT = "/newworkout/:workoutId",
}
