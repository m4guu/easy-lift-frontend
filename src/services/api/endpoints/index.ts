enum ENDPOINTS {
  // internal API
  PROGRAMS = "programs",
  WORKOUTS = "workouts",
  TRAINERS = "trainers",
  USERS_PROGRESS = "usersProgress",
  USERS = "users",

  // auth
  LOGIN = "auth/login",
  REGISTER = "auth/register",
  LOGOUT = "logout",
  RESET_PASSWORD = "resetPassword",

  // exerciseDB API
  EXERCISES = "exercises",
  EXERCISE = "exercise",
  BODY_PARTS = "bodyPartList",
}

export default ENDPOINTS;
