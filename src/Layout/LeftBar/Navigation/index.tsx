import React from "react";

import { MenuList } from "@mui/material";

import { NavigationItem } from "../../../components";

import { Constans } from "./constans";

const Navigation: React.FC = () => {
  const navList = Constans();

  return (
    <MenuList>
      {navList.map((navItem) => {
        return <NavigationItem key={navItem.id} navItem={navItem} />;
      })}
    </MenuList>
  );
};

export default Navigation;
