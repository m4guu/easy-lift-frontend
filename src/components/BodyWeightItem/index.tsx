import React from "react";

import { Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { getLongMonthFormByDate } from "../../utils/Date";

import { BodyWeight } from "../../shared/interfaces";

interface BodyWeightItemProps {
  weight: BodyWeight;
}
const BodyWeightItem: React.FC<BodyWeightItemProps> = ({ weight }) => {
  const theme = useTheme();
  return (
    <Item>
      <Date variant="caption">{getLongMonthFormByDate(weight.date)}</Date>
      <Container>
        <Typography color="primary">{weight.weight}</Typography>
        <Typography color={theme.palette.text.secondary}>kg</Typography>
      </Container>
    </Item>
  );
};

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(1),
}));

const Date = styled(Typography)({
  fontSize: "1rem",
});

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(0.5),
}));
export default BodyWeightItem;
