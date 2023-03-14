import React from "react";

import { MenuItem, ListItemIcon, Typography, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { NavLink } from "react-router-dom";

import { NavigationItem as NavigationItemInterface } from "../../shared/interfaces";

type NavigationItemProps = {
  navItem: NavigationItemInterface;
  toggleDrawer?: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const NavigationItem: React.FC<NavigationItemProps> = ({
  navItem,
  toggleDrawer,
}) => {
  const theme = useTheme();

  const activeStyle = {
    backgroundColor: theme.palette.background.default,
  };

  const handleUndefinedToggle = (
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    if (typeof toggleDrawer === "function") {
      toggleDrawer()(event);
    }
  };

  return (
    <MenuListItem>
      <NavigationLink
        to={navItem.link}
        onClick={handleUndefinedToggle}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        <ListItemIcon>{navItem.icon}</ListItemIcon>
        <NavItemTypography variant="subtitle2">
          {navItem.title}
        </NavItemTypography>
      </NavigationLink>
    </MenuListItem>
  );
};

const MenuListItem = styled(MenuItem)(({ theme }) => ({
  padding: 0,
  marginBottom: "0.2rem",
  borderRadius: " 0.7rem",
  borderEndEndRadius: 0,
  borderStartEndRadius: 0,
  marginRight: `-${theme.spacing(2)}`,
  [theme.breakpoints.down("lg")]: {
    minWidth: "17rem",
    marginRight: 0,
    borderRadius: 0,
  },
}));

const NavigationLink = styled(NavLink)(({ theme }) => ({
  width: "100%",
  display: "flex",
  padding: theme.spacing(1),
  alignItems: "center",
  borderRadius: " 0.7rem",
  borderEndEndRadius: 0,
  borderStartEndRadius: 0,
  textDecoration: "none",
  color: "inherit",
  [theme.breakpoints.down("lg")]: {
    borderRadius: 0,
  },
}));

const NavItemTypography = styled(Typography)({
  paddingLeft: "1rem",
});

export default NavigationItem;
