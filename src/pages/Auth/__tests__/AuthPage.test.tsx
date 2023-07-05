import { Mock } from "vitest";
import { fireEvent, render, screen } from "../../../config/tests/custom-render";

import { useUserContext } from "../../../contexts/userContext";

import Auth from "..";

import { Status } from "../../../shared/enums";

vi.mock("../../../../hooks/formHooks/auth/useAuthForm", () => ({
  useAuthForm: vi.fn().mockReturnValue({
    methods: {
      handleSubmit: vi.fn(),
    },
    onSubmit: vi.fn(),
  }),
}));
vi.mock("../../../contexts/userContext");

const mockedUseUserContext = useUserContext as Mock;
// const mockedUseAuthForm = useAuthForm as Mock;

describe("Auth Page", () => {
  describe("registration", () => {
    describe("with valid registration data", () => {
      it("should redirect to the login board", () => {
        mockedUseUserContext.mockReturnValue({
          isLogging: false,
          isRegistering: false,
          registerStatus: Status.IDLE,
        });

        const { rerender } = render(<Auth />);
        const signUpTab = screen.getByText("signup");
        const loginTab = screen.getByText("login");

        // change into registration tab
        fireEvent.click(signUpTab);
        // mock
        mockedUseUserContext.mockReturnValue({
          isLogging: false,
          isRegistering: false,
          registerStatus: Status.SUCCESS,
        });
        rerender(<Auth />);

        expect(loginTab).toHaveAttribute("aria-selected", "true");
      });
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
  });
});
