import { Mock, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

import { render } from "../../../../../config/tests/custom-render";
import { useUserContext } from "../../../../../contexts/userContext";

import Auth from "../../..";

import { Status } from "../../../../../shared/enums";
import {
  mockedPassword,
  mockedEmail,
  getEmailInput,
  getPasswordInput,
  getConfirmPasswordInput,
  clickRegisterButton,
  clickSignUpTab,
  getLoginTab,
} from "../constans";

vi.mock("../../../../hooks/formHooks/auth/useAuthForm");
vi.mock("../../../../../contexts/userContext");

const mockedUseUserContext = useUserContext as Mock;

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

        clickSignUpTab();
        // mockup successfully register response
        mockedUseUserContext.mockReturnValue({
          isLogging: false,
          isRegistering: false,
          registerStatus: Status.SUCCESS,
        });
        rerender(<Auth />);

        expect(getLoginTab()).toHaveAttribute("aria-selected", "true");
      });
      it("should automatically complete the email in the login board", async () => {
        const { rerender } = render(<Auth />);

        clickSignUpTab();
        await userEvent.type(getEmailInput(), mockedEmail);
        await userEvent.type(getPasswordInput(), mockedPassword);
        await userEvent.type(getConfirmPasswordInput(), mockedPassword);
        clickRegisterButton();

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
        expect(getEmailInput()).toHaveValue(mockedEmail);
        // todo: fix bug with password reset
        // expect(passwordInput).toHaveValue("");
      });
    });

    describe("with invalid registration data", () => {
      it("should not redirect to the login board", () => {
        const { rerender } = render(<Auth />);

        // change into registration tab
        clickSignUpTab();
        // mockup invalid register response
        mockedUseUserContext.mockReturnValue({
          isLogging: false,
          isRegistering: false,
          registerStatus: Status.ERROR,
        });
        rerender(<Auth />);

        expect(getLoginTab()).toHaveAttribute("aria-selected", "false");
      });
    });
  });
});
