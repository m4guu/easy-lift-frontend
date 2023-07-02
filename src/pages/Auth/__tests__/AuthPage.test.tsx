import axios from "axios";

// vi.mock("axios");

describe("Auth Page", () => {
  describe("registration", () => {
    describe("with valid registration data", () => {
      it.todo("should redirect to the login board", async () => {});
      it.todo(
        "should automatically complete the email in the login board",
        async () => {}
      );
    });
    describe("with invalid registration data", () => {
      it.todo("should not redirect to the login board", () => {});
    });
  });

  describe("login", () => {
    describe("with valid login data", () => {
      it.todo("should set user to local storage", () => {});
      describe("configured user", () => {
        it.todo("should redirect to home page", async () => {});
      });
      describe("not configured user", () => {
        it.todo("should redirect to configuration page", async () => {});
      });
    });
    describe("with invalid login data", () => {});
  });
});
