import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ScaleIcon from "@mui/icons-material/Scale";

import { v4 as uuidv4 } from "uuid";
import { PATHS } from "../../../pages/paths";

import { useGetUserRole } from "../../../store/redux-store/slices/user/user.hooks";

import { NavigationItem } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";

export const Constans = () => {
  const { role } = useGetUserRole();

  const navList: NavigationItem[] = [
    {
      id: uuidv4(),
      title: "Home",
      link: PATHS.default,
      icon: <HomeIcon color="primary" fontSize="large" />,
    },
    {
      id: uuidv4(),
      title: role === Role.user ? "Workouts" : "Programs",
      link: role === Role.user ? PATHS.NEW_WORKOUT : PATHS.NEW_PROGRAM,
      icon: <FitnessCenterIcon color="primary" fontSize="large" />,
    },
    {
      id: uuidv4(),
      title: "Body Weight",
      link: PATHS.BODY_WEIGHT,
      icon: <ScaleIcon color="primary" fontSize="large" />,
    },
    {
      id: uuidv4(),
      title: "Trainers",
      link: PATHS.TRAINERS,
      icon: <EngineeringIcon color="primary" fontSize="large" />,
    },
  ];

  return navList;
};
