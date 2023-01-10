import React from "react";

import { MenuItem, ListItemIcon, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { NavLink } from "react-router-dom";

type Props = { navItem: { title: string; link: string; icon: JSX.Element } };

const NavigationItem: React.FC<Props> = ({ navItem }) => {
  const theme = useTheme();

  const activeStyle = {
    backgroundColor: theme.palette.others.activeNavItem,
  };

  return (
    <MenuListItem>
      <NavigationLink
        to={navItem.link}
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
  borderRadius: " 0.7rem",
  marginBottom: "0.1rem",
  [theme.breakpoints.down("lg")]: {
    minWidth: "17rem",
  },
}));

const NavigationLink = styled(NavLink)({
  width: "100%",
  display: "flex",
  padding: "0.7rem",
  alignItems: "center",
  borderRadius: " 0.7rem",
  textDecoration: "none",
  color: "inherit",
});

const NavItemTypography = styled(Typography)({
  paddingLeft: "1rem",
});

export default NavigationItem;
