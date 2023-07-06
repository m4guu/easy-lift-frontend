import { Mock } from "vitest";
import {
  fireEvent,
  render,
  screen,
} from "../../../../../config/tests/custom-render";

import { useLogin } from "../../../../../hooks/queryHooks/auth/useLogin";

import Auth from "../../..";

import {
  userTestCases,
  mockedEmail,
  mockedPassword,
  mockedUser,
} from "./scenarios.cases";

vi.mock("../../../../../hooks/queryHooks/auth/useLogin");

const mockedUseLogin = useLogin as Mock;
const mockSetItem = vi.spyOn(Storage.prototype, "setItem");

describe("Auth Page", () => {
  describe("login", () => {
    describe("with valid login data", () => {
      // ? question: why my mockSetItem doesnt work properly ?
      it.todo("should set user to local storage", () => {
        mockedUseLogin.mockReturnValue({
          isLoading: false,
          error: null,
          mutateAsync: vi.fn().mockResolvedValue({
            user: mockedUser,
          }),
        });
        render(<Auth />);

        // get input elements by label
        const emailInput = screen.getByLabelText("E-mail");
        const passwordInput = screen.getByLabelText("Password");
        // set values for the input elements
        fireEvent.change(emailInput, {
          target: { value: mockedEmail },
        });
        fireEvent.change(passwordInput, { target: { value: mockedPassword } });
        // trigger the login button
        fireEvent.click(
          screen.getByRole("button", {
            name: "Login",
          })
        );

        expect(mockSetItem).toHaveBeenCalledTimes(1);
      });

      // tests depending on the user's configuration and lack thereof
      it.each(userTestCases)("iteration #%#", ({ user, expectedUrl }) => {
        mockedUseLogin.mockReturnValue({
          isLoading: false,
          error: null,
          mutateAsync: vi.fn().mockResolvedValue({
            user,
          }),
        });
        render(<Auth />);

        // get input elements by label
        const emailInput = screen.getByLabelText("E-mail");
        const passwordInput = screen.getByLabelText("Password");
        // set values for the input elements
        fireEvent.change(emailInput, {
          target: { value: mockedEmail },
        });
        fireEvent.change(passwordInput, { target: { value: mockedPassword } });
        // trigger the login button
        fireEvent.click(
          screen.getByRole("button", {
            name: "Login",
          })
        );

        expect(global.window.location.href).toContain(expectedUrl);
      });
    });
  });
});
