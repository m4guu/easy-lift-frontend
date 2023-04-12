import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../../../../contexts/userContext";
import { useDeleteProgramMutation } from "../../../../../hooks/queryHooks/programsHooks/useDeleteProgramMutation";
import { useConfirmModal } from "../../../../../hooks/modalHooks/Confirm/useConfirmModal";
import { useSnackbar } from "../../../../../hooks";

import { PATHS } from "../../../../paths";
import { Program } from "../../../../../shared/interfaces";
import { SnackbarStatus, Status } from "../../../../../shared/enums";
import { Confirm } from "../../../../../modals";

interface ProgramActionsProps {
  // todo: change  program[0] ---> program [when backend will be written]
  program: Program[];
}

export const ProgramActions: React.FC<ProgramActionsProps> = ({ program }) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { open, isOpen, close } = useConfirmModal();

  const { status, mutate: deleteQueryProgram } = useDeleteProgramMutation(
    program[0].id
  );

  const deleteProgram = () => deleteQueryProgram(program[0].id);

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate(PATHS.default);
      snackbar("Program deleted successfully!", SnackbarStatus.SUCCESS);
    }
    if (status === Status.ERROR) {
      snackbar("Something goes wrong. Please try later.", SnackbarStatus.ERROR);
    }
  }, [snackbar, navigate, status]);

  return (
    <PorgramActions>
      {program[0].creator.id !== user?.id ? (
        <Button variant="contained" size="small">
          buy
        </Button>
      ) : (
        <TrainerProgramActions>
          <Button
            onClick={() => navigate(`${PATHS.NEW_PROGRAM}/${program[0].id}`)}
            variant="contained"
            size="small"
            color="info"
          >
            edit
          </Button>
          <Button onClick={open} variant="contained" size="small" color="error">
            delete
          </Button>
        </TrainerProgramActions>
      )}

      <Confirm
        onConfirm={deleteProgram}
        confirmTitle="delete program"
        isOpen={isOpen}
        closeModal={close}
      />
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
