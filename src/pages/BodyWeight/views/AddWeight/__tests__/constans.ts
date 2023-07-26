import { screen } from "../../../../../config/tests/custom-render";
import { User } from "../../../../../shared/interfaces";

// PAGE ELEMENTS
export function getSnackbar() {
  return screen.getAllByRole("alert")[0];
}
// MOCKS
export const userMock: Partial<User> = {
  currentWeight: 90,
};
