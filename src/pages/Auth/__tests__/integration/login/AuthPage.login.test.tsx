import { Mock } from "vitest";
import userEvent from "@testing-library/user-event";

import { render } from "../../../../../config/tests/custom-render";
import { useLogin } from "../../../../../hooks/queryHooks/auth/useLogin";

import Auth from "../../..";

import { userTestCases } from "./scenarios.cases";
import {
  getEmailInput,
  getPasswordInput,
  clickLoginButton,
  mockedEmail,
  mockedPassword,
  mockedUser,
} from "../constans";

vi.mock("../../../../../hooks/queryHooks/auth/useLogin");

const mockedUseLogin = useLogin as Mock;
// ? question: why mockSetItem doesnt work properly ?
const mockSetItem = vi.spyOn(Storage.prototype, "setItem");

describe("Auth Page", () => {
  describe("login", () => {
    describe("with valid login data", () => {
      it.todo("should set user to local storage", async () => {
        mockedUseLogin.mockReturnValue({
          isLoading: false,
          error: null,
          mutateAsync: vi.fn().mockResolvedValue({
            user: mockedUser,
          }),
        });
        render(<Auth />);

        await userEvent.type(getEmailInput(), mockedEmail);
        await userEvent.type(getPasswordInput(), mockedPassword);
        clickLoginButton();

        expect(mockSetItem).toHaveBeenCalledTimes(1);
      });

      // tests depending on the user's configuration and lack thereof
      it.each(userTestCases)("iteration #%#", async ({ user, expectedUrl }) => {
        mockedUseLogin.mockReturnValue({
          isLoading: false,
          error: null,
          mutateAsync: vi.fn().mockResolvedValue({
            user,
          }),
        });

        render(<Auth />);
        await userEvent.type(getEmailInput(), mockedEmail);
        await userEvent.type(getPasswordInput(), mockedPassword);
        clickLoginButton();

        expect(global.window.location.href).toContain(expectedUrl);
      });
    });
  });
});
