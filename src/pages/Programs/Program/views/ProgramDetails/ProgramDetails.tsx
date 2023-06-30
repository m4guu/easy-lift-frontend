import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useUser } from "../../../../../hooks/queryHooks/userHooks/useUser";

import { UserAvatar } from "../../../../../components/ExerciseProgresItem/ExerciseProgresItem.styles";

import { API_URL } from "../../../../../config/env.config";
import { PATHS } from "../../../../paths";
import { StatusBar } from "../../../../../components";

interface ProgramDetailsProps {
  description: string;
  level: string;
  frequency: number;
  creatorId: string;
  programLength: number;
}

export const ProgramDetails: React.FC<ProgramDetailsProps> = ({
  description,
  level,
  frequency,
  creatorId,
  programLength,
}) => {
  const { error, status, data: creator } = useUser(creatorId);

  return (
    <Details>
      <ProgramDetail>
        <SegmentCaption variant="caption">author</SegmentCaption>
        <NoPaddingDivider />
        {creator && (
          <UserLink to={`${PATHS.TRAINERS}/${creator.id}`}>
            <UserAvatar src={`${API_URL}${creator.image}`} />
            <Typography>{creator.name}</Typography>
          </UserLink>
        )}
        <StatusBar status={status} error={error} />
      </ProgramDetail>

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
  color: theme.palette.primary.main,
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.9rem",
  },
}));

const UserLink = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  margin: `${theme.spacing(0.5)} 0`,
  textDecoration: "none",
  color: "inherit",
}));

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
  [theme.breakpoints.down("sm")]: {
    margin: `0 -${theme.spacing(1)}`,
  },
}));
