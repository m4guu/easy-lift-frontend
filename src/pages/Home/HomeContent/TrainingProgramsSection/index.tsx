import React from "react";

import styled from "@mui/system/styled";

import ProgramList from "./ProgramList";

const TreningProgramsSection: React.FC = () => {
  return (
    <SectionContainer>
      <ProgramList />
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    height: "40%",
  },
}));

export default TreningProgramsSection;
