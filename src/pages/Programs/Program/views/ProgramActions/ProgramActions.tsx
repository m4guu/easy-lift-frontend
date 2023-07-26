import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, useMediaQuery, Theme } from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useUserContext } from "../../../../../contexts/userContext";
import { useDeleteProgramMutation } from "../../../../../hooks/queryHooks/programsHooks/useDeleteProgramMutation";
import { useSnackbar } from "../../../../../hooks";

import { PATHS } from "../../../../paths";
import { Program } from "../../../../../shared/interfaces";
import { SnackbarStatus, Status } from "../../../../../shared/enums";
import { ButtonWithConfirmation } from "../../../../../components";

interface ProgramActionsProps {
  program: Program;
}

export const ProgramActions: React.FC<ProgramActionsProps> = ({ program }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const {
    error,
    status,
    mutate: deleteQueryProgram,
  } = useDeleteProgramMutation(program.id);

  const deleteProgram = () => deleteQueryProgram(program.id);

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate(PATHS.default);
      snackbar("Program deleted successfully!", SnackbarStatus.SUCCESS);
    }
    if (status === Status.ERROR && error) {
      snackbar(error.message, SnackbarStatus.ERROR);
    }
  }, [snackbar, navigate, status, error]);

  return (
    <PorgramActions>
      {program.creator !== user?.id ? (
        <Button
          endIcon={<ShoppingCartIcon />}
          variant="contained"
          size="medium"
          fullWidth={isMobile}
        >
          buy
        </Button>
      ) : (
        <TrainerProgramActions>
          <Button
            onClick={() => navigate(`${PATHS.NEW_PROGRAM}/${program.id}`)}
            variant="contained"
            size="small"
            color="info"
          >
            edit
          </Button>
          <ButtonWithConfirmation
            onConfirm={deleteProgram}
            variant="contained"
            size="small"
            color="error"
          >
            delete
          </ButtonWithConfirmation>
        </TrainerProgramActions>
      )}
    </PorgramActions>
  );
};

const PorgramActions = styled(Box)(({ theme }) => ({
  padding: `0 ${theme.spacing(2)}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));
const TrainerProgramActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));
