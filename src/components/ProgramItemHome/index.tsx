import React from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  Box,
  Divider,
  Chip,
  ListItem,
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

// todo: change dummy img into real Program Image -> change program FORM !
import DUMMY_PROGRAM_IMG from "../../assets/images/programs/dummy-program-image.jpg";

type ProgramItemHomeProps = {
  program: Program;
};

const ProgramItemHome: React.FC<ProgramItemHomeProps> = ({ program }) => {
  const { user } = useUserContext();
  const theme = useTheme();
  return (
    <ProgramItemCard to={`${PATHS.PROGRAMS}/${program.id}`}>
      <HeaderContainer>
        <ProgramImage src={DUMMY_PROGRAM_IMG} alt="program" />
        <Overlay />
        <ProgramTitle variant="subtitle1" color="primary">
          {program.title}
        </ProgramTitle>
      </HeaderContainer>
      <ProgramContent>
        <ContentHeader>
          <ContentText
            variant="caption"
            color={theme.palette.custom_grey.tint_2}
          >
            {program.creator.name}
            {"  "}
            {program.creator.id === user?.id && (
              <Chip
                color="info"
                label={<Typography variant="caption">you</Typography>}
                size="small"
                variant="outlined"
              />
            )}
          </ContentText>
          <Price
            variant="filled"
            color="primary"
            size="small"
            label={
              <Typography variant="caption">
                {program.price.toFixed(2)} $
              </Typography>
            }
          />
        </ContentHeader>

        <Box>
          <Box>
            <Typography color="whitesmoke" variant="caption">
              Program Description
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.custom_grey.tint_2}
            >
              {program.description}
            </Typography>
          </Box>
        </Box>

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
        <Divider />
      </ProgramContent>
    </ProgramItemCard>
  );
};
const ProgramItemCard = styled(Link)(({ theme }) => ({
  position: "relative",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
  alignItems: "center",
  textDecoration: "none",
}));

const HeaderContainer = styled("header")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

const ProgramImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "20rem",
  objectFit: "cover",
  [theme.breakpoints.up("md")]: {
    maxHeight: "30rem",
  },
}));
const Overlay = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6923144257703081) 72%, rgba(8,8,8,0.6895133053221288) 100%)",
});
const ProgramTitle = styled(Typography)({
  position: "absolute",
  bottom: 15,
  textTransform: "uppercase",
  letterSpacing: "1px",
});

const ProgramContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const ContentHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const ProgramAtions = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(1)} 0`,
}));
const Buy = styled(Button)({});
const Edit = styled(Button)({});
const ContentText = styled(Typography)({
  letterSpacing: "1px",
});

const Price = styled(Chip)({});

export default ProgramItemHome;
