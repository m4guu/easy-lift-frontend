import React, { useState } from "react";

import { Drawer, Button } from "@mui/material";

import Navigation from "../Navigation";

export default function TemporaryDrawer() {
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsShowDrawer(open);
    };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>menu</Button>
      <Drawer open={isShowDrawer} onClose={toggleDrawer(false)}>
        <Navigation />
      </Drawer>
    </>
  );
}
