import React from "react";
import { Link } from "react-router-dom";

import { Typography, Box, Divider, Chip } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

// todo: change dummy img into real Program Image -> change program FORM !
import DUMMY_PROGRAM_IMG from "../../assets/images/programs/dummy-program-image.jpg";
import { useUserContext } from "../../contexts/userContext";

type ProgramItemProps = {
  program: Program;
};

const ProgramItem: React.FC<ProgramItemProps> = ({ program }) => {
  const { user } = useUserContext();
  const theme = useTheme();
  return (
    <ProgramItemCard to={`${PATHS.PROGRAMS}/${program.id}`}>
      <ProgramImage src={DUMMY_PROGRAM_IMG} alt="Program" />

      <ProgramContent>
        <TopDivider />
        <ContentText variant="caption" color={theme.palette.custom_grey.tint_2}>
          {program.creator.name}
          {program.creator.id === user?.id && (
            <Chip
              color="info"
              label={<Typography variant="caption">you</Typography>}
              size="small"
              variant="outlined"
            />
          )}
        </ContentText>
        <ContentText variant="subtitle1" color="primary">
          {program.title}
        </ContentText>
        <ContentText variant="caption" color={theme.palette.custom_grey.tint_2}>
          {program.price.toFixed(2)} $
        </ContentText>
        <BottomDivider />
      </ProgramContent>
    </ProgramItemCard>
  );
};

const ProgramItemCard = styled(Link)(({ theme }) => ({
  display: "flex",
  position: "relative",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  alignItems: "center",
  textDecoration: "none",
}));

const ProgramImage = styled("img")({
  width: "5rem",
  height: "5rem",
  objectFit: "cover",
});

const ProgramContent = styled(Box)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
});

const BottomDivider = styled(Divider)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
});
const TopDivider = styled(Divider)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
});
const ContentText = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  letterSpacing: "1px",
});

export default ProgramItem;
