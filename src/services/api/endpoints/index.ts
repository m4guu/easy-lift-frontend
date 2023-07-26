enum ENDPOINTS {
  // internal API
  PROGRAMS = "programs",
  WORKOUTS = "workouts",
  USER_WORKOUTS = "workouts/userWorkouts",
  USER_WORKOUTS_BY_MONTH = "workouts/userWorkoutsByMonth",
  TRAINERS = "trainers",
  USERS_PROGRESS = "user-progress",
  USERS = "users",

  // auth
  LOGIN = "auth/login",
  LOGOUT = "auth/logout",
  AUTO_LOGIN = "auth/loginWithToken",
  REGISTER = "auth/register",
  CONFIG_USER = "configure/user",
  CONFIG_TRAINER = "configure/trainer",
  UPDATE_EMAIL = "updateEmail",
  UPDATE_PASSWORD = "updatePassword",
  WEIGHT_HISTORY = "weight-history",
  UPDATE_WEIGHT_HISTORY = "weight-history/update",

  // exerciseDB API
  EXERCISES = "exercises",
  EXERCISE = "exercise",
}

export default ENDPOINTS;
