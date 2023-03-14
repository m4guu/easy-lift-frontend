import React, { useState } from "react";

import { Box, Drawer, Button, Divider } from "@mui/material";
import { styled } from "@mui/system";

import Navigation from "../Navigation";
import { SectionHeader } from "../../../components";

export default function TemporaryDrawer() {
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsShowDrawer((prevState) => !prevState);
    };

  return (
    <>
      <Button onClick={toggleDrawer()}>menu</Button>
      <Drawer open={isShowDrawer} onClose={toggleDrawer()}>
        <Container>
          <SectionHeader>menu</SectionHeader>
          <Divider />
        </Container>
        <Navigation toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
}

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textAlign: "center",
}));
