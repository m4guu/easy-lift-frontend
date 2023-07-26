import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Divider, List, ListItem } from "@mui/material";
import { styled } from "@mui/system";

import { useWeightHistory } from "../../../../hooks/queryHooks/weightHistory/useWeightHistory";

import {
  SectionHeader,
  BodyWeightItem,
  StatusBar,
} from "../../../../components";

export const WeightHistory: React.FC<{ userId: string }> = ({ userId }) => {
  const { error, status, data: weightHistory } = useWeightHistory(userId);

  return (
    <SectionContainer>
      <SectionHeader>history</SectionHeader>
      <NoPaddingDivider />
      <StatusBar status={status} error={error} />

      <HistoryList disablePadding>
        {weightHistory &&
          weightHistory.bodyWeights.map((weight) => {
            return (
              <Item key={uuidv4()} disablePadding>
                <Container>
                  <BodyWeightItem weight={weight} />
                  <Divider />
                </Container>
              </Item>
            );
          })}
      </HistoryList>
    </SectionContainer>
  );
};

const SectionContainer = styled("section")({});
const HistoryList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column-reverse",
  borderRight: `solid thin ${theme.palette.others.border_color}`,
  borderLeft: `solid thin ${theme.palette.others.border_color}`,
}));
const Item = styled(ListItem)({
  display: "inherit",
});

const Container = styled(Box)({
  width: "100%",
});

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
}));
