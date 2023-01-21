import React from "react";

import { Typography } from "@mui/material";
import styled from "@mui/system/styled";

import ExercisesProgress from "./ExercisesProgress";

const ExercisesProgressSection: React.FC = () => {
  return (
    <section>
      <SectionHeader>
        <Typography variant="caption">exercises progress</Typography>
      </SectionHeader>
      <ExercisesProgress />
    </section>
  );
};

const SectionHeader = styled("header")(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}));

export default ExercisesProgressSection;
