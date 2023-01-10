import React from "react";

import styled from "@mui/system/styled";

import PrevSlideButton from "./PrevSlideButton";
import NextSlideButton from "./NextSlideButton";

const ProgramsNav: React.FC = () => {
  return (
    <NavigationContainer>
      <PrevSlideButton />
      <NextSlideButton />
    </NavigationContainer>
  );
};
const NavigationContainer = styled("div")({
  display: "flex",
  gap: "0.5rem ",
  zIndex: "100",
});

export default ProgramsNav;
