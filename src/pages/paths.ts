export enum PATHS {
  default = "/",
  notFound = "*",

  AUTH = "/auth",
  CONFIGURATION = "/configuration",
  PROFILE = "/profile",

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
  EDIT_PROGRAM = "/newprogram/:programId",

  WORKOUT = "/workouts/:workoutId",
  EDIT_WORKOUT = "/newworkout/:workoutId",
}
