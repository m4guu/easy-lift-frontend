import { Mock } from "vitest";

import {
  render,
  screen,
  fireEvent,
} from "../../../../../config/tests/custom-render";

import { useUserContext } from "../../../../../contexts/userContext";
import { useConfigureUserMutation } from "../../../../../hooks/queryHooks/auth/useConfigureUserMutation";

import Configuration from "../../..";

import {
  invalidUserCongigurationData,
  userMock,
  validUserCongigurationData,
} from "../constans";
import { Status } from "../../../../../shared/enums";
import { PATHS } from "../../../../paths";

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
      it("should resest form & redirect to home page", () => {
        render(<Configuration />);
        // get input elements by label
        const nameInput = screen.getByLabelText("Name");
        const heightInput = screen.getByLabelText("Height [cm]");
        const weightInput = screen.getByLabelText("Weight [kg]");
        // set valid values for the input elements
        fireEvent.change(nameInput, {
          target: { value: validUserCongigurationData.name },
        });
        fireEvent.change(heightInput, {
          target: { value: validUserCongigurationData.height },
        });
        fireEvent.change(weightInput, {
          target: { value: validUserCongigurationData.weight },
        });
        // trigger the configurate button
        const submitButton = screen.getByText("configurate");
        fireEvent.click(submitButton);
        // expect the form reset correctly
        expect(nameInput).toBeEmptyDOMElement();
        expect(heightInput).toBeEmptyDOMElement();
        expect(weightInput).toBeEmptyDOMElement();
        // expect redirect to home page
        expect(global.window.location.href).toContain(PATHS.default);
      });
    });

    describe("configure with invalid data", () => {
      it("should not resest form", () => {
        render(<Configuration />);
        // get input elements by label
        const nameInput = screen.getByLabelText("Name");
        const heightInput = screen.getByLabelText("Height [cm]");
        const weightInput = screen.getByLabelText("Weight [kg]");
        // set invalid value for the input elements
        fireEvent.change(nameInput, {
          target: { value: invalidUserCongigurationData.name },
        });
        fireEvent.change(heightInput, {
          target: { value: invalidUserCongigurationData.height },
        });
        fireEvent.change(weightInput, {
          target: { value: invalidUserCongigurationData.weight },
        });
        // trigger the configurate button
        const submitButton = screen.getByText("configurate");
        fireEvent.click(submitButton);
        // expect the form reset correctly
        expect(nameInput).toHaveValue(invalidUserCongigurationData.name);
        expect(heightInput).toHaveValue(
          invalidUserCongigurationData.height.toString()
        );
        expect(weightInput).toHaveValue(
          invalidUserCongigurationData.weight.toString()
        );
      });
    });
  });
});
