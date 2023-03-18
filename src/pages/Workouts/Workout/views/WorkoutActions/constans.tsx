import { v4 as uuidv4 } from "uuid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export enum WorkoutActionsEnum {
  DELETE = "delete",
  EDIT = "edit",
}

export const actions = [
  {
    id: uuidv4(),
    name: WorkoutActionsEnum.EDIT,
    icon: <EditIcon fontSize="small" color="info" />,
  },
  {
    id: uuidv4(),
    name: WorkoutActionsEnum.DELETE,
    icon: <DeleteIcon fontSize="small" color="error" />,
  },
];
