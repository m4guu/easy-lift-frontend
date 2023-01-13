import React from "react";

import { MenuList } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ScaleIcon from "@mui/icons-material/Scale";

import { v4 as uuidv4 } from "uuid";

import { useGetUserRole } from "../../../store/redux-store/slices/user/user.hooks";

import { PATHS } from "../../../pages/paths";

import { NavigationItem } from "../../../components";

const Navigation: React.FC = () => {
  const { role } = useGetUserRole();
  const navList = [
    {
      id: uuidv4(),
      title: "Home",
      link: PATHS.default,
      icon: <HomeIcon color="primary" fontSize="large" />,
    },
    {
      id: uuidv4(),
      title: role === "user" ? "Workouts" : "Programs",
      link: role === "user" ? PATHS.NEW_WORKOUT : PATHS.NEW_PROGRAM,
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

  return (
    <MenuList>
      {navList.map((navItem) => {
        return <NavigationItem key={navItem.id} navItem={navItem} />;
      })}
    </MenuList>
  );
};

export default Navigation;
