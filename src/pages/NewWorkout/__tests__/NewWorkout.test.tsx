describe("NewWorkout Page", () => {
  describe("user", () => {
    describe("create workout", () => {
      describe("with valid data", () => {
        it.todo("shoud reset new workout form", async () => {});
        it.todo("shoud update workouts list", async () => {});
      });
      describe("with invalid data", () => {
        it.todo("shoud not reset new workout form", async () => {});
        it.todo("shoud throw snackbar with error", async () => {});
      });
    });
    describe("update workout", () => {
      describe("with valid data", () => {
        it.todo("should redirect to workouts page");
      });
      describe("with invalid data", () => {
        it.todo("should not redirect to workouts page");
      });
    });
  });

  describe("trainer", () => {
    describe("create", () => {
      describe("with valid data", () => {
        it.todo("should update workout field in new program");
      });
      describe("with invalid data", () => {
        it.todo("should not update workout field in new program");
      });
    });
  });
});
