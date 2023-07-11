import { fireEvent, screen } from "../../../../config/tests/custom-render";

import { User } from "../../../../shared/interfaces";
import { Role, TestId } from "../../../../shared/enums";

// PAGE ELEMENTS
export function getEmailInput() {
  return screen.getByRole("textbox", {
    name: /e-mail/i,
  });
}
export function getSignUpTab() {
  return screen.getByRole("tab", {
    name: /signup/i,
  });
}
export function getLoginTab() {
  return screen.getByRole("tab", {
    name: /login/i,
  });
}
export function getPasswordInput() {
  return screen.getByTestId(TestId.PASSWORD);
}
export function getConfirmPasswordInput() {
  return screen.getByTestId(TestId.CONFIRM_PASSWORD);
}

// ACTIONS
export function clickLoginButton() {
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
}
export async function clickRegisterButton() {
  fireEvent.click(
    await screen.findByRole("button", { name: /create account/i })
  );
}
export async function clickSignUpTab() {
  fireEvent.click(getSignUpTab());
}
export function clickLoginTab() {
  fireEvent.click(getLoginTab());
}

// MOCKS
export const mockedEmail = "mocked@email.com";
export const mockedPassword = "mockedPassword";
export const configuredUserMock: Partial<User> = {
  isConfigured: true,
};
export const notConfiguredUserMock: Partial<User> = {
  isConfigured: false,
};
export const mockedUser: User = {
  id: "mocked-id",
  name: "mocked-name",
  email: "mocked@email.com",
  password: "mockedPassword",
  role: Role.user,
  isConfigured: true,
  image: "mockedImageString",
};
