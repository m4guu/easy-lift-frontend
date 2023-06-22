import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Box,
  Button,
  ListItem,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useUser } from "../../hooks/queryHooks/userHooks/useUser";

import { Program } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

import { useUserContext } from "../../contexts/userContext";
import { API_URL } from "../../config/env.config";

type ProgramItemProps = {
  program: Program;
};

const ProgramItem: React.FC<ProgramItemProps> = ({ program }) => {
  const { user } = useUserContext();
  const { data: trainer } = useUser(program.creator);
  const navigate = useNavigate();
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Item disablePadding>
      <Container onClick={() => navigate(`${PATHS.PROGRAMS}/${program.id}`)}>
        <ImageBox>
          <ProgramImage src={`${API_URL}${program.image}`} alt="Program" />
          <ImageOverlay />
        </ImageBox>

        <ProgramContent>
          <ContentContainer>
            <ContentText
              variant="caption"
              color={theme.palette.custom_grey.tint_2}
            >
              {trainer && (
                <Typography variant="caption">{trainer.name}</Typography>
              )}
              {program.creator === user?.id && (
                <Typography variant="caption" color="info.main">
                  you
                </Typography>
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
        </ProgramContent>
      </Container>

      {isUpSm && (
        <ProgramActions>
          {program.creator !== user?.id ? (
            <Button variant="contained" size="small" fullWidth>
              buy
            </Button>
          ) : (
            <Button
              onClick={() => navigate(`${PATHS.NEW_PROGRAM}/${program.id}`)}
              variant="contained"
              size="small"
              color="info"
              fullWidth
            >
              edit
            </Button>
          )}
        </ProgramActions>
      )}
    </Item>
  );
};

const Item = styled(ListItem)({
  position: "relative",
});

const Container = styled(Button)(({ theme }) => ({
  display: "flex",
  width: "100%",
  position: "relative",
  gap: theme.spacing(1),
  alignItems: "center",
  textDecoration: "none",
}));

const ProgramActions = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
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
  textTransform: "none",
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
    "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3074404761904762) 72%, rgba(8,8,8,0.3895133053221288) 100%)",
});

export default ProgramItem;
