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
  invalidUserConfigData,
  userMock,
  validUserConfigData,
} from "../constans";
import { Status } from "../../../../../shared/enums";
import { PATHS } from "../../../../paths";
import {
  defaultHeightValue,
  defaultWeightValue,
} from "../../../../../hooks/formHooks/configuration/constans";

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
    describe("configure with valid data", () => {
      it("should resest form & redirect to home page", async () => {
        render(<Configuration />);
        await userEvent.type(getNameInput(), validUserConfigData.name);
        await userEvent.upload(getImageInput(), validUserConfigData.image);
        clickConfigureButton();

        // expect the form reset correctly
        // ? question: why reset form from react-hook-form doesnt work properly ?
        // expect(getNameInput()).toHaveValue("");
        expect(getHeightInput()).toHaveValue(`${defaultHeightValue}`);
        expect(getWeightInput()).toHaveValue(`${defaultWeightValue}`);
        // expect redirect to home page
        expect(global.window.location.href).toContain(PATHS.default);
      });
    });

    describe("configure with invalid data", () => {
      it("should not resest form", async () => {
        render(<Configuration />);
        // clear default values
        userEvent.clear(getHeightInput());
        userEvent.clear(getWeightInput());
        // set invalid data
        await userEvent.type(getNameInput(), invalidUserConfigData.name);
        await userEvent.type(
          getHeightInput(),
          `${invalidUserConfigData.height}`
        );
        await userEvent.type(
          getWeightInput(),
          `${invalidUserConfigData.weight}`
        );
        clickConfigureButton();

        // expect the form not reset
        expect(getNameInput()).toHaveValue(invalidUserConfigData.name);
        expect(getHeightInput()).toHaveValue(`${invalidUserConfigData.height}`);
        expect(getWeightInput()).toHaveValue(`${invalidUserConfigData.weight}`);
      });
    });
  });
});
