import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { defaultSet } from "./constans";
import { Add, Comment, Details } from "./views/SetActions";
import { SetArchived, SetGoal, SetTempo } from "./views/Sets.form";

type SetsProps = {
  exerciseId: string;
  exerciseIndex: number;
};
export const Sets: React.FC<SetsProps> = ({ exerciseId, exerciseIndex }) => {
  const [sets, setSets] = useState([defaultSet]);

  // todo: refactory dummy function
  const addNewSet = () => {
    setSets((prev) => {
      const { id, ...defaultSetWithoutId } = defaultSet;

      const newSet = {
        id: uuidv4(),
        ...defaultSetWithoutId,
      };
      return [...prev, newSet];
    });
  };
  return (
    <SetsContainer>
      <SetList>
        {sets.map((set, i) => {
          return (
            <SetItem key={set.id}>
              <SetNumber variant="h3" color="primary">
                {i + 1}
              </SetNumber>
              <SetGoal exerciseIndex={exerciseIndex} setIndex={i} />
              <SetTempo exerciseIndex={exerciseIndex} setIndex={i} />
              <SetArchived exerciseIndex={exerciseIndex} setIndex={i} />
            </SetItem>
          );
        })}
      </SetList>
      <Divider />
      <SetActionsWrapper>
        <Add addNewSet={addNewSet} />
        <Box>
          <Comment />
          <Details exerciseId={exerciseId} />
        </Box>
      </SetActionsWrapper>
    </SetsContainer>
  );
};

const SetsContainer = styled(Box)({});
const SetList = styled(List)({
  width: "50%",
});
const SetItem = styled(ListItem)({
  padding: 0,
});
const SetNumber = styled(Typography)({
  width: "25%",
});

const SetActionsWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
