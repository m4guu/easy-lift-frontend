import NewProgram from "../../..";
import { render } from "../../../../../config/tests/custom-render";

describe("NewProgram Page", () => {
  describe("create program", () => {
    describe("with valid data", () => {
      it.todo("should reset program form & redirect to home page", () => {
        render(<NewProgram />);
      });
    });

    describe("with invalid data", () => {
      it.todo(
        "should not reset program form & throw snackbar with error",
        () => {}
      );
    });
  });
});
