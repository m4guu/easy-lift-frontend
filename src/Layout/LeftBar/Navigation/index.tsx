import React from "react";

import { MenuList } from "@mui/material";
import { styled } from "@mui/system";

import { NavigationItem } from "../../../components";

import { Constans } from "./constans";

interface NavigationProps {
  toggleDrawer?: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Navigation: React.FC<NavigationProps> = ({ toggleDrawer }) => {
  const navList = Constans();

  return (
    <List disablePadding>
      {navList.map((navItem) => {
        return (
          <NavigationItem
            key={navItem.id}
            navItem={navItem}
            toggleDrawer={toggleDrawer}
          />
        );
      })}
    </List>
  );
};

const List = styled(MenuList)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    marginTop: theme.spacing(1),
  },
}));

export default Navigation;
