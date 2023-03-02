import React from "react";

import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/system";

interface ProgramDetailsProps {
  description: string;
  level: string;
  frequency: number;
  programLength: number;
}

export const ProgramDetails: React.FC<ProgramDetailsProps> = ({
  description,
  level,
  frequency,
  programLength,
}) => {
  return (
    <Details>
      <ProgramDetail>
        <SegmentCaption variant="caption">description</SegmentCaption>
        <NoPaddingDivider />
        <Detail variant="body2">{description}</Detail>
      </ProgramDetail>
      <ProgramDetail>
        <SegmentCaption variant="caption">level</SegmentCaption>
        <NoPaddingDivider />
        <Detail variant="body2">{level}</Detail>
      </ProgramDetail>
      <ProgramDetail>
        <SegmentCaption variant="caption">frequency</SegmentCaption>
        <NoPaddingDivider />
        <Detail variant="body2">{frequency} days/week</Detail>
      </ProgramDetail>
      <ProgramDetail>
        <SegmentCaption variant="caption">length</SegmentCaption>
        <NoPaddingDivider />
        <Detail variant="body2">{programLength} weeks</Detail>
      </ProgramDetail>
    </Details>
  );
};

const Details = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const ProgramDetail = styled("li")({
  listStyle: "none",
});

const Detail = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    fontSize: "1rem",
  },
}));

const SegmentCaption = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  color: theme.palette.custom_grey.tint_2,
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.9rem",
  },
}));

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
  [theme.breakpoints.down("sm")]: {
    margin: `0 -${theme.spacing(1)}`,
  },
}));
