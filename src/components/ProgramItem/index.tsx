import React from "react";
import { Link } from "react-router-dom";

import { Typography, Box, Button, Chip } from "@mui/material";
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
      <ImageBox>
        <ProgramImage src={DUMMY_PROGRAM_IMG} alt="Program" />
        <ImageOverlay />
      </ImageBox>

      <ProgramContent>
        <ContentContainer>
          <ContentText
            variant="caption"
            color={theme.palette.custom_grey.tint_2}
          >
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
          <ContentText variant="h3" color="primary">
            {program.title}
          </ContentText>
          <ContentText
            variant="caption"
            color={theme.palette.custom_grey.tint_2}
          >
            {program.price.toFixed(2)} $
          </ContentText>
        </ContentContainer>

        <ProgramAtions>
          {program.creator.id !== user?.id ? (
            <Buy variant="contained" size="small" fullWidth>
              buy
            </Buy>
          ) : (
            <Edit variant="contained" size="small" color="info" fullWidth>
              edit
            </Edit>
          )}
        </ProgramAtions>
      </ProgramContent>
    </ProgramItemCard>
  );
};

const ProgramItemCard = styled(Link)(({ theme }) => ({
  display: "flex",
  position: "relative",
  gap: theme.spacing(1),
  margin: `${theme.spacing(1)} 0`,
  alignItems: "center",
  textDecoration: "none",
}));

const ProgramImage = styled("img")({
  width: "60px",
  height: "60px",
  objectFit: "cover",
});

const ProgramContent = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

const ContentText = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  letterSpacing: "1px",
}));

const ContentContainer = styled(Box)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
});

const ImageBox = styled(Box)({
  position: "relative",
});
const ImageOverlay = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5074404761904762) 72%, rgba(8,8,8,0.6895133053221288) 100%)",
});

const ProgramAtions = styled(Box)({});
const Buy = styled(Button)({});
const Edit = styled(Button)({});

export default ProgramItem;
