enum ENDPOINTS {
  // internal API
  PROGRAMS = "programs",
  WORKOUTS = "workouts",
  TRAINERS = "trainers",
  USERS_PROGRESS = "usersProgress",
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
  BODY_PARTS = "bodyPartList",
}

export default ENDPOINTS;
