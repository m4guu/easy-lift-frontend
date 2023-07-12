import { fireEvent, screen } from "../../../../config/tests/custom-render";

import { UserConfig } from "../../../../hooks/formHooks/configuration/useUserConfigForm";
import { Role, TestId } from "../../../../shared/enums";
import { User } from "../../../../shared/interfaces";

// PAGE ELEMENTS
export function getNameInput() {
  return screen.getByRole("textbox", {
    name: /name/i,
  });
}
export function getHeightInput() {
  return screen.getByRole("textbox", {
    name: /height \[cm\]/i,
  });
}
export function getWeightInput() {
  return screen.getByRole("textbox", {
    name: /weight \[kg\]/i,
  });
}
export function getImageInput() {
  return screen.getByTestId(TestId.IMAGE_INPUT);
}
// ACTIONS
export function clickConfigureButton() {
  fireEvent.click(screen.getByRole("button", { name: /configurate/i }));
}
// MOCKS
export const userMock: Partial<User> = {
  role: Role.user,
};
export const validUserConfigData: Omit<UserConfig, "height" | "weight"> = {
  name: "John",
  image: [new File([""], "mock.png", { type: "image/png" })],
};
export const invalidUserConfigData: Omit<UserConfig, "image"> = {
  name: "J",
  height: 1800,
  weight: 1,
};
