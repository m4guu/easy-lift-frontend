import React from "react";

import { List, Divider, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useTrainers } from "../../hooks/queryHooks/userHooks/useTrainers";

import { Status } from "../../shared/enums";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { TrainerItem, SectionHeader, SectionContainer } from "../../components";
import { useTrainerFilter } from "../../hooks/filters/useTrainerFilter";

const TrainersPage: React.FC = () => {
  const { status, error, data: trainers } = useTrainers();
  const { updatedList, filterPanelProps } = useTrainerFilter(trainers);

  return (
    <SectionContainer>
      <SectionHeader>Our Trainers</SectionHeader>

      {status === Status.LOADING && <div>Loading...</div>}
      {status === Status.ERROR && <div>error</div>}

      <FilterPanel filterHandlers={filterPanelProps} />

      <TrainerList disablePadding>
        {updatedList.length === 0 ? (
          <Typography>No search result</Typography>
        ) : (
          updatedList.map((trainer) => {
            return (
              <Box key={trainer.id}>
                <NoPaddingDivider />
                <TrainerItem trainer={trainer} />
              </Box>
            );
          })
        )}
      </TrainerList>
      <NoPaddingDivider />
    </SectionContainer>
  );
};

const TrainerList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  marginLeft: `-${theme.spacing(2)}`,
  marginRight: `-${theme.spacing(2)}`,
}));

const Trainers = TrainersPage;
export default Trainers;
