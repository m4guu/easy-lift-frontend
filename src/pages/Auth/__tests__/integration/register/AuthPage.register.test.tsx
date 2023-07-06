import { Mock, beforeEach } from "vitest";
import {
  fireEvent,
  render,
  screen,
} from "../../../../../config/tests/custom-render";

import { useUserContext } from "../../../../../contexts/userContext";

import Auth from "../../..";

import { Status } from "../../../../../shared/enums";

vi.mock("../../../../hooks/formHooks/auth/useAuthForm");
vi.mock("../../../../../contexts/userContext");

const mockedUseUserContext = useUserContext as Mock;
const mockedEmail = "mocked@email.com";
const mockedPassword = "mockedPassword";

beforeEach(() => {
  mockedUseUserContext.mockReturnValue({
    registerUser: vi.fn().mockResolvedValue(true),
    isLogging: false,
    isRegistering: false,
    registerStatus: Status.IDLE,
  });
});

describe("Auth Page", () => {
  describe("registration", () => {
    describe("with valid registration data", () => {
      it("should redirect to the login board", () => {
        const { rerender } = render(<Auth />);
        const signUpTab = screen.getByText("signup");
        const loginTab = screen.getByText("login");
        // change into registration tab
        fireEvent.click(signUpTab);
        // mockup successfully register response
        mockedUseUserContext.mockReturnValue({
          isLogging: false,
          isRegistering: false,
          registerStatus: Status.SUCCESS,
        });
        rerender(<Auth />);

        expect(loginTab).toHaveAttribute("aria-selected", "true");
      });
      it("should automatically complete the email in the login board", () => {
        const { rerender } = render(<Auth />);
        // change into registration tab
        const signUpTab = screen.getByText("signup");
        fireEvent.click(signUpTab);
        // get input elements by label
        const emailInput = screen.getByLabelText("E-mail");
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        // set values for the input elements
        fireEvent.change(emailInput, {
          target: { value: mockedEmail },
        });
        fireEvent.change(passwordInput, { target: { value: mockedPassword } });
        fireEvent.change(confirmPasswordInput, {
          target: { value: mockedPassword },
        });
        // trigger the create acc button
        fireEvent.click(
          screen.getByRole("button", {
            name: "Create Account",
          })
        );
        // Update the mocked value and re-render the component
        mockedUseUserContext.mockReturnValueOnce({
          login: vi.fn(),
          registerUser: vi.fn(),
          registerError: null,
          isLogging: false,
          isRegistering: false,
          registerStatus: Status.SUCCESS,
        });
        rerender(<Auth />);
        // assertion
        expect(emailInput).toHaveValue(mockedEmail);
        // todo: fix bug with password reset
        // expect(passwordInput).toHaveValue("");
      });
    });
    describe("with invalid registration data", () => {
      it("should not redirect to the login board", () => {
        const { rerender } = render(<Auth />);
        const signUpTab = screen.getByText("signup");
        const loginTab = screen.getByText("login");

        // change into registration tab
        fireEvent.click(signUpTab);
        // mockup invalid register response
        mockedUseUserContext.mockReturnValue({
          isLogging: false,
          isRegistering: false,
          registerStatus: Status.ERROR,
        });
        rerender(<Auth />);

        expect(loginTab).toHaveAttribute("aria-selected", "false");
      });
    });
  });
});
