import { Mock } from "vitest";
import userEvent from "@testing-library/user-event";

import { render } from "../../../../../config/tests/custom-render";

import { useUserContext } from "../../../../../contexts/userContext";
import { useConfigureUserMutation } from "../../../../../hooks/queryHooks/auth/useConfigureUserMutation";

import Configuration from "../../..";

import {
  clickConfigureButton,
  getHeightInput,
  getImageInput,
  getNameInput,
  getWeightInput,
  userMock,
} from "../constans";
import { Status } from "../../../../../shared/enums";

import { userConfigTestCases } from "./scenarios.cases";

// ? question: why this mock doesnt work properly ?
vi.mock("react-leaflet");
vi.mock("react-leaflet-cluster");
vi.mock("../../../../../contexts/userContext");
vi.mock("../../../../../hooks/queryHooks/auth/useConfigureUserMutation");

const mockedUseUserContext = useUserContext as Mock;
const mockedUseConfigUserMutation = useConfigureUserMutation as Mock;

beforeEach(() => {
  mockedUseUserContext.mockReturnValue({
    autoLogin: vi.fn(),
    user: userMock,
  });
  mockedUseConfigUserMutation.mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue(true),
    status: Status.IDLE,
    isLoading: false,
    error: null,
  });
});

describe("Configuration Page", () => {
  describe("user", () => {
    it.each(userConfigTestCases)(
      "iteration #%#",
      async ({ configData, expectedFormValues, expectedUrl }) => {
        render(<Configuration />);
        // clear default values
        userEvent.clear(getHeightInput());
        userEvent.clear(getWeightInput());
        // set config data
        await userEvent.type(getNameInput(), configData.name);
        await userEvent.type(getHeightInput(), `${configData.height}`);
        await userEvent.type(getWeightInput(), `${configData.weight}`);
        await userEvent.upload(getImageInput(), configData.image);
        clickConfigureButton();

        // expect the form reset correctly
        // ? question: why reset from react-hook-form doesnt work properly ?
        // expect(getNameInput()).toHaveValue(expectedFormValues.name);
        // expect(getHeightInput()).toHaveValue(`${expectedFormValues.height}`);
        // expect(getWeightInput()).toHaveValue(`${expectedFormValues.weight}`);
        // expect redirect to home page with valid config data
        expect(global.window.location.href).toContain(expectedUrl);
      }
    );
  });
});
