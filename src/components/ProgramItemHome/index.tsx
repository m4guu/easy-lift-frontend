import React from "react";
import { Link } from "react-router-dom";

import { Typography, Box, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";
import { API_URL } from "../../config/env.config";

type ProgramItemHomeProps = {
  program: Program;
};

const ProgramItemHome: React.FC<ProgramItemHomeProps> = ({ program }) => {
  const { user } = useUserContext();
  const theme = useTheme();

  return (
    <ProgramItemCard to={`${PATHS.PROGRAMS}/${program._id}`}>
      <HeaderContainer>
        <ProgramImage src={`${API_URL}${program.image}`} alt="program" />
        <Overlay />
        <ProgramTitle variant="subtitle1" color="primary">
          {program.title}
        </ProgramTitle>
      </HeaderContainer>

      <ProgramContent>
        <ContentWrapper>
          <AuthorBox>
            <Typography color="primary" variant="caption">
              Author
            </Typography>
            <ContentText
              variant="caption"
              color={theme.palette.custom_grey.tint_2}
            >
              {program.creator.name}
              {program.creator.id === user?.id && (
                <Typography variant="caption" color="info.main">
                  you
                </Typography>
              )}
            </ContentText>
          </AuthorBox>

          <Divider />

          <Description>
            <DescriptionHeader color="primary" variant="caption">
              Program Description
            </DescriptionHeader>

            <Divider />

            <DescriptionContent
              variant="body2"
              color={theme.palette.custom_grey.tint_2}
              sx={{ height: "100%" }}
            >
              {program.description.substring(0, 100)}...
            </DescriptionContent>
          </Description>

          <Price variant="subtitle1" color="primary">
            {program.price.toFixed(2)} $
          </Price>
        </ContentWrapper>
      </ProgramContent>
    </ProgramItemCard>
  );
};
const ProgramItemCard = styled(Link)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  marginBottom: theme.spacing(1),
  alignItems: "center",
  textDecoration: "none",
  borderRadius: theme.spacing(1),
}));

const HeaderContainer = styled("header")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const ProgramImage = styled("img")({
  width: "100%",
  height: "12rem",
  objectFit: "cover",
});

const Overlay = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6923144257703081) 42%, rgba(8,8,8,0.1895133053221288) 100%)",
});

const ProgramTitle = styled(Typography)({
  position: "absolute",
  bottom: 15,
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1px",
});

const ProgramContent = styled(Box)({
  width: "100%",
  flex: 1,
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100%",
  border: `solid thin ${theme.palette.others.border_color}`,
  borderTop: "none",
}));

const AuthorBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Description = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
}));
const DescriptionHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));
const DescriptionContent = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));
const ContentText = styled(Typography)({
  letterSpacing: "1px",
});

const Price = styled(Typography)(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(0.5),
  bottom: theme.spacing(0.5),
}));

export default ProgramItemHome;
