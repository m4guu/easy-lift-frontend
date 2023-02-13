import React from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";

import { styled } from "@mui/system";
import { PATHS } from "../../../../../../../../paths";

export const Add: React.FC<{ addNewSet: () => void }> = ({ addNewSet }) => {
  return (
    <IconBtn onClick={addNewSet}>
      <AddIcon color="primary" />
    </IconBtn>
  );
};

export const Comment: React.FC = () => {
  return (
    <IconBtn size="small">
      <EditIcon color="primary" />
    </IconBtn>
  );
};

export const Details: React.FC<{ exerciseId: string }> = ({ exerciseId }) => {
  return (
    <Link to={`${PATHS.EXERCISES_PROGRESS}/${exerciseId}`}>
      <IconBtn size="small">
        <InfoIcon />
      </IconBtn>
    </Link>
  );
};

const IconBtn = styled(IconButton)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`,
  "&:hover": {
    background: "inherit",
    transform: "scale(1.1)",
  },
}));
