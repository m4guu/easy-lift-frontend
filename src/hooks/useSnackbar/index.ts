import { useMemo } from "react";
import { enqueueSnackbar, SnackbarMessage } from "notistack";

import { snackbarDefaultOptions } from "./constans";
import { SnackbarStatus } from "../../shared/enums";

const useSnackbar = () => {
  const snackbar = useMemo(
    () => (message: SnackbarMessage, status: SnackbarStatus) => {
      return enqueueSnackbar(message, {
        variant: status,
        ...snackbarDefaultOptions,
      });
    },
    []
  );
  return snackbar;
};

export default useSnackbar;
