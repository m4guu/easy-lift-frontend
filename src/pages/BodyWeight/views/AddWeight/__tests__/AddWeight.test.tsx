import { Mock } from "vitest";
import { render, screen } from "../../../../../config/tests/custom-render";

import { useUserContext } from "../../../../../contexts/userContext";
import { useUpdateWeightMutation } from "../../../../../hooks/queryHooks/weightHistory/useUpdateWeightMutation";

import { AddWeight } from "../AddWeight";

import { getSnackbar, userMock } from "./constans";
import { undefinedError } from "../../../../../services/api/HttpService/constans";
import { Status } from "../../../../../shared/enums";

vi.mock("../../../../../contexts/userContext");
vi.mock(
  "../../../../../hooks/queryHooks/weightHistory/useUpdateWeightMutation"
);

const mockedUseUserContext = useUserContext as Mock;
const mockedUseUpdateWeightMutation = useUpdateWeightMutation as Mock;

beforeEach(() => {
  mockedUseUserContext.mockReturnValue({
    user: userMock,
  });
  mockedUseUpdateWeightMutation.mockReturnValue({
    isLoading: false,
    error: undefinedError,
    status: Status.ERROR,
    mutateAsync: vi.fn().mockResolvedValue(false),
  });
});

describe("AddWeight Component", () => {
  describe("with server error", () => {
    it("should throw snackbar with server error message", async () => {
      render(<AddWeight />);

      const snackbar = getSnackbar();

      expect(snackbar).toBeInTheDocument();
      expect(snackbar).toHaveTextContent(undefinedError.message);
    });
  });
});
